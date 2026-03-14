import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import CartPanel from "./CartPanel"

const { placeOrderMock } = vi.hoisted(() => ({
  placeOrderMock: vi.fn(),
}))

vi.mock("../menu/menuApi", async () => {
  const actual = await vi.importActual<typeof import("../menu/menuApi")>(
    "../menu/menuApi",
  )

  return {
    ...actual,
    usePlaceOrderMutation: () => [
      placeOrderMock,
      { isLoading: false, error: undefined },
    ],
  }
})

beforeEach(() => {
  placeOrderMock.mockReset()
})

test("updates quantity and total from cart controls", async () => {
  const { user } = renderWithProviders(<CartPanel />, {
    preloadedState: {
      cart: {
        items: [
          {
            menuItemId: "ff-1",
            name: "Classic Burger",
            photoUrl: "https://example.com/burger.jpg",
            quantity: 1,
            unitPrice: 8.99,
          },
        ],
      },
    },
  })

  await user.click(
    screen.getByRole("button", {
      name: "Increase quantity for Classic Burger",
    }),
  )

  expect(screen.getByText("$17.98")).toBeInTheDocument()
  expect(screen.getByText("2")).toBeInTheDocument()
})

test("submits the order and clears the cart after a successful response", async () => {
  placeOrderMock.mockReturnValue({
    unwrap: vi.fn().mockResolvedValue({
      id: "order-1",
    }),
  })

  const { user, store } = renderWithProviders(<CartPanel />, {
    preloadedState: {
      cart: {
        items: [
          {
            menuItemId: "ff-1",
            name: "Classic Burger",
            photoUrl: "https://example.com/burger.jpg",
            quantity: 2,
            unitPrice: 8.99,
          },
        ],
      },
    },
  })

  await user.click(screen.getByRole("button", { name: "Submit Order" }))

  expect(placeOrderMock).toHaveBeenCalledWith({
    items: [
      {
        menuItemId: "ff-1",
        name: "Classic Burger",
        photoUrl: "https://example.com/burger.jpg",
        quantity: 2,
        unitPrice: 8.99,
      },
    ],
  })

  await waitFor(() => {
    expect(store.getState().cart.items).toEqual([])
  })
})
