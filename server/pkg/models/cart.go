package models

type CartItem struct {
	MenuItemID string  `json:"menuItemId"`
	Name       string  `json:"name"`
	UnitPrice  float64 `json:"unitPrice"`
	Quantity   int     `json:"quantity"`
}
