import { CartItemType } from "../lib/types"

export const findTotalItems = (items: CartItemType[]) => {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export const findTotalPrice = (items: CartItemType[]) => {
  return items.reduce(
    (total, item) => (total = total + item.quantity * item.unitPrice),
    0,
  )
}

export const formatCategory = (category: string) => {
  return category.replace(/_/g, " ")
}
