package routes

import (
	"github.com/Lovenson2000/frontend_assignment/cmd/controllers"
	"github.com/gofiber/fiber/v3"
	"github.com/jmoiron/sqlx"
)

func RegisterMenuRoutes(app *fiber.App, db *sqlx.DB) {
	api := app.Group("/api")

	api.Get("/menu", func(c fiber.Ctx) error {
		return controllers.GetAllMenuItems(db, c)
	})
}
