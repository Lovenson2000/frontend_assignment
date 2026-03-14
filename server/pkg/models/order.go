package models

import "time"

type OrderStatus string

const (
	OrderStatusPending   OrderStatus = "pending"
	OrderStatusSubmitted OrderStatus = "submitted"
	OrderStatusCompleted OrderStatus = "completed"
)

type OrderItem struct {
	MenuItemID string  `json:"menuItemId"`
	Name       string  `json:"name"`
	PhotoURL   string  `json:"photoUrl"`
	UnitPrice  float64 `json:"unitPrice"`
	Quantity   int     `json:"quantity"`
	LineTotal  float64 `json:"lineTotal"`
}

type Order struct {
	ID         string      `json:"id"`
	Items      []OrderItem `json:"items"`
	TotalPrice float64     `json:"totalPrice"`
	Status     OrderStatus `json:"status"`
	CreatedAt  time.Time   `json:"createdAt"`
}
