package configs

import (
	"fmt"
	"os"

	"github.com/Lovenson2000/frontend_assignment/pkg/models"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var seedMenuItems = []models.MenuItem{
	{ID: "ff-1", Category: models.FastFood, Name: "Classic Burger", Description: "Beef patty, lettuce, tomato, and house sauce", PhotoURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80", Price: 8.99},
	{ID: "ff-2", Category: models.FastFood, Name: "Crispy Fries", Description: "Golden potato fries with sea salt", PhotoURL: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80", Price: 3.49},
	{ID: "ff-3", Category: models.FastFood, Name: "Chicken Wrap", Description: "Grilled chicken, slaw, and garlic mayo", PhotoURL: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80", Price: 7.99},
	{ID: "as-1", Category: models.Asian, Name: "Chicken Teriyaki Bowl", Description: "Steamed rice with chicken teriyaki and vegetables", PhotoURL: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80", Price: 11.49},
	{ID: "as-2", Category: models.Asian, Name: "Pad Thai", Description: "Rice noodles with tamarind sauce and peanuts", PhotoURL: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=80", Price: 12.25},
	{ID: "as-3", Category: models.Asian, Name: "Salmon Sushi Roll", Description: "Fresh salmon roll with cucumber and sesame", PhotoURL: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80", Price: 10.75},
	{ID: "bv-1", Category: models.Beverages, Name: "Iced Tea", Description: "Black tea served chilled", PhotoURL: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=900&q=80", Price: 2.99},
	{ID: "bv-2", Category: models.Beverages, Name: "Mango Smoothie", Description: "Fresh mango blended with yogurt", PhotoURL: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80", Price: 4.99},
	{ID: "bv-3", Category: models.Beverages, Name: "Sparkling Water", Description: "Chilled sparkling mineral water", PhotoURL: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=900&q=80", Price: 2.49},
}

func OpenDB() (*sqlx.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "postgres"),
		getEnv("DB_NAME", "foody"),
	)

	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func InitMenuStore(db *sqlx.DB) error {
	schema := []string{
		`CREATE TABLE IF NOT EXISTS menu_items (
			id TEXT PRIMARY KEY,
			category_slug TEXT NOT NULL,
			name TEXT NOT NULL,
			description TEXT NOT NULL DEFAULT '',
			photo_url TEXT NOT NULL DEFAULT '',
			price NUMERIC(10, 2) NOT NULL CHECK (price >= 0)
		)`,
		`ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS photo_url TEXT NOT NULL DEFAULT ''`,
	}

	for _, stmt := range schema {
		if _, err := db.Exec(stmt); err != nil {
			return err
		}
	}

	// I'M USING STATIC SEED DATA FOR SIMPLICITY. IN A MORE REALISTIC SCENARIO
	// THIS WOULD BE HANDLED THROUGH POST REQUESTS TO AN ADMIN ENDPOINT OR THROUGH A MIGRATION TOOL.
	for _, item := range seedMenuItems {
		if _, err := db.Exec(
			`INSERT INTO menu_items (id, category_slug, name, description, photo_url, price)
			 VALUES ($1, $2, $3, $4, $5, $6)
			 ON CONFLICT (id) DO UPDATE SET
			 	category_slug = EXCLUDED.category_slug,
			 	name = EXCLUDED.name,
			 	description = EXCLUDED.description,
			 	photo_url = EXCLUDED.photo_url,
			 	price = EXCLUDED.price`,
			item.ID,
			item.Category,
			item.Name,
			item.Description,
			item.PhotoURL,
			item.Price,
		); err != nil {
			return err
		}
	}

	return nil
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}

	return fallback
}
