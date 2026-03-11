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
