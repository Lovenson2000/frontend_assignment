package controllers

import (
	"encoding/json"
	"time"

	"github.com/Lovenson2000/frontend_assignment/pkg/models"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type placeOrderRequest struct {
	Items []models.CartItem `json:"items"`
}

type orderRecord struct {
	ID         string             `db:"id"`
	Items      json.RawMessage    `db:"items"`
	TotalPrice float64            `db:"total_price"`
	Status     models.OrderStatus `db:"status"`
	CreatedAt  time.Time          `db:"created_at"`
}

func PlaceOrder(db *sqlx.DB, c fiber.Ctx) error {
	var req placeOrderRequest
	if err := c.Bind().Body(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	if len(req.Items) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "order must include at least one item",
		})
	}

	itemIDs := make([]string, 0, len(req.Items))
	seen := make(map[string]struct{}, len(req.Items))
	for _, item := range req.Items {
		if item.MenuItemID == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "menuItemId is required for every item",
			})
		}
		if item.Quantity <= 0 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "quantity must be greater than zero",
			})
		}
		if _, ok := seen[item.MenuItemID]; ok {
			continue
		}
		seen[item.MenuItemID] = struct{}{}
		itemIDs = append(itemIDs, item.MenuItemID)
	}

	query, args, err := sqlx.In(
		`SELECT id, name, price FROM menu_items WHERE id IN (?)`,
		itemIDs,
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to prepare order lookup",
		})
	}

	query = db.Rebind(query)

	var menuItems []struct {
		ID    string  `db:"id"`
		Name  string  `db:"name"`
		Price float64 `db:"price"`
	}
	if err := db.Select(&menuItems, query, args...); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to validate order items",
		})
	}

	menuItemsByID := make(map[string]struct {
		Name  string
		Price float64
	}, len(menuItems))
	for _, item := range menuItems {
		menuItemsByID[item.ID] = struct {
			Name  string
			Price float64
		}{
			Name:  item.Name,
			Price: item.Price,
		}
	}

	orderItems := make([]models.OrderItem, 0, len(req.Items))
	var totalPrice float64
	for _, item := range req.Items {
		menuItem, ok := menuItemsByID[item.MenuItemID]
		if !ok {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "one or more menu items do not exist",
			})
		}

		lineTotal := menuItem.Price * float64(item.Quantity)
		orderItems = append(orderItems, models.OrderItem{
			MenuItemID: item.MenuItemID,
			Name:       menuItem.Name,
			UnitPrice:  menuItem.Price,
			Quantity:   item.Quantity,
			LineTotal:  lineTotal,
		})
		totalPrice += lineTotal
	}

	itemsJSON, err := json.Marshal(orderItems)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to serialize order items",
		})
	}

	order := models.Order{
		ID:         uuid.NewString(),
		Items:      orderItems,
		TotalPrice: totalPrice,
		Status:     models.OrderStatusSubmitted,
		CreatedAt:  time.Now().UTC(),
	}

	_, err = db.Exec(
		`INSERT INTO orders (id, items, total_price, status, created_at)
		 VALUES ($1, $2, $3, $4, $5)`,
		order.ID,
		itemsJSON,
		order.TotalPrice,
		order.Status,
		order.CreatedAt,
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to place order",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"order": order,
	})
}

func GetAllOrders(db *sqlx.DB, c fiber.Ctx) error {
	var records []orderRecord

	query := `SELECT id, items, total_price, status, created_at FROM orders ORDER BY created_at DESC`
	if err := db.Select(&records, query); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to fetch orders",
		})
	}

	orders := make([]models.Order, 0, len(records))
	for _, record := range records {
		var items []models.OrderItem
		if len(record.Items) > 0 {
			if err := json.Unmarshal(record.Items, &items); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": "failed to decode order items",
				})
			}
		}

		orders = append(orders, models.Order{
			ID:         record.ID,
			Items:      items,
			TotalPrice: record.TotalPrice,
			Status:     record.Status,
			CreatedAt:  record.CreatedAt,
		})
	}

	return c.JSON(fiber.Map{
		"orders": orders,
	})
}

func DeleteAllOrders(db *sqlx.DB, c fiber.Ctx) error {
	if _, err := db.Exec(`DELETE FROM orders`); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to delete orders",
		})
	}

	return c.JSON(fiber.Map{
		"message": "all orders deleted",
	})
}
