import { screen } from "@testing-library/react"
import { renderWithProviders } from "../utils/test-utils"
import MenuCard from "./MenuCard"
import { MenuCategory } from "../lib/types"

const menuItem = {
  id: "ff-1",
  name: "Classic Burger",
  category: MenuCategory.FAST_FOOD,
  description: "Beef patty",
  photoUrl: "https://example.com/burger.jpg",
  price: 8.99,
}

test("adds an item once and locks the button after it is in the cart", async () => {
  const onItemAdded = vi.fn()
  const { user, store } = renderWithProviders(
    <MenuCard item={menuItem} onItemAdded={onItemAdded} />,
  )

  const button = screen.getByRole("button", { name: "Add to Cart" })
  await user.click(button)

  expect(onItemAdded).toHaveBeenCalledWith("Classic Burger")
  expect(store.getState().cart.items).toEqual([
    {
      menuItemId: "ff-1",
      name: "Classic Burger",
      photoUrl: "https://example.com/burger.jpg",
      quantity: 1,
      unitPrice: 8.99,
    },
  ])

  expect(
    screen.getByRole("button", { name: "Added to Cart" }),
  ).toBeDisabled()
})
