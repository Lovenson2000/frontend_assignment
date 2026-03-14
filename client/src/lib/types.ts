export type View = "menu" | "history"

export type OrderStatus = "pending" | "submitted" | "completed"

export enum MenuCategory {
  FAST_FOOD = "fast_food",
  ASIAN = "asian",
  BEVERAGES = "beverages",
}

export type MenuItem = {
  id: string
  name: string
  category: MenuCategory
  description?: string
  photoUrl: string
  price: number
}

export type CartItemType = {
  menuItemId: string
  name: string
  unitPrice: number
  quantity: number
  photoUrl: string
}

export type CartItem = CartItemType

export type GetMenuResponse = {
  items: MenuItem[]
}

export type OrderItem = {
  menuItemId: string
  name: string
  photoUrl: string
  unitPrice: number
  quantity: number
  lineTotal: number
}

export type Order = {
  id: string
  items: OrderItem[]
  totalPrice: number
  status: OrderStatus
  createdAt: string
}

export type GetOrdersResponse = {
  orders: Order[]
}

export type PlaceOrderRequest = {
  items: CartItem[]
}

export type PlaceOrderResponse = {
  order: Order
}

export type ButtonProps = {
  bgColor: string
  hoverBgColor?: string
  borderColor?: string
  textColor: string
  text: string
  className?: string
  disabled?: boolean
  onClick: () => void
}
