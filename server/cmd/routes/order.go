package routes

import (
	"github.com/Lovenson2000/frontend_assignment/cmd/controllers"
	"github.com/gofiber/fiber/v3"
	"github.com/jmoiron/sqlx"
)

func RegisterOrderRoutes(app *fiber.App, db *sqlx.DB) {
	api := app.Group("/api")

	api.Get("/orders", func(c fiber.Ctx) error {
		return controllers.GetAllOrders(db, c)
	})

	api.Post("/orders", func(c fiber.Ctx) error {
		return controllers.PlaceOrder(db, c)
	})

	api.Delete("/orders", func(c fiber.Ctx) error {
		return controllers.DeleteAllOrders(db, c)
	})
}
