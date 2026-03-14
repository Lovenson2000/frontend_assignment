export type View = "menu" | "history"

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

export type ButtonProps = {
  bgColor: string
  hoverBgColor?: string
  borderColor?: string
  textColor: string
  text: string
  className?: string
  onClick: () => void
}
