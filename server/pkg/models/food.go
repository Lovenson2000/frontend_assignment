package models

type MenuItem struct {
	ID          string       `db:"id" json:"id"`
	Category    MenuCategory `db:"category_slug" json:"category"`
	Name        string       `db:"name" json:"name"`
	Description string       `db:"description" json:"description,omitempty"`
	PhotoURL    string       `db:"photo_url" json:"photoUrl"`
	Price       float64      `db:"price" json:"price"`
}
