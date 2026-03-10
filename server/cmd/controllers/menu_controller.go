package controllers

import (
	"github.com/Lovenson2000/frontend_assignment/pkg/models"
	"github.com/gofiber/fiber/v3"
	"github.com/jmoiron/sqlx"
)

func GetAllMenuItems(db *sqlx.DB, c fiber.Ctx) error {
	var items []models.MenuItem

	query := "SELECT * FROM menu_items ORDER BY category_slug, name"

	err := db.Select(&items, query)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to fetch menu items",
		})
	}

	return c.JSON(fiber.Map{
		"items": items,
	})
}
