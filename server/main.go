package main

import (
	"fmt"

	"github.com/gofiber/fiber/v3"
)

func main() {
	fmt.Print("Hello world")

	app := fiber.New(fiber.Config{
		BodyLimit: 100 * 1024 * 1024,
	})

	app.Get("/health", func(c fiber.Ctx) error {
		return c.SendString("Server is Healthy and Running")
	})

	app.Listen(":8000")
}
