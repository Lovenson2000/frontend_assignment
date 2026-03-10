package main

import (
	"log"

	"github.com/Lovenson2000/frontend_assignment/cmd/routes"
	"github.com/Lovenson2000/frontend_assignment/pkg/configs"
	"github.com/gofiber/fiber/v3"
)

func main() {
	db, err := configs.OpenDB()
	if err != nil {
		log.Fatalf("open database: %v", err)
	}
	defer db.Close()

	if err := configs.InitMenuStore(db); err != nil {
		log.Fatalf("init menu store: %v", err)
	}

	app := fiber.New(fiber.Config{
		BodyLimit: 100 * 1024 * 1024,
	})

	app.Get("/health", func(c fiber.Ctx) error {
		return c.SendString("Server is Healthy and Running")
	})

	routes.RegisterMenuRoutes(app, db)

	log.Fatal(app.Listen(":8000"))
}
