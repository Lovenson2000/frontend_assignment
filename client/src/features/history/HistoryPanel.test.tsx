import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import HistoryPanel from "./HistoryPanel"
import type { Order } from "../../lib/types"

const { clearOrdersMock, getOrdersState } = vi.hoisted(() => ({
  clearOrdersMock: vi.fn(),
  getOrdersState: {
    data: [] as Order[],
    isLoading: false,
    error: undefined,
    isFetching: false,
  },
}))

vi.mock("../menu/menuApi", async () => {
  const actual = await vi.importActual<typeof import("../menu/menuApi")>(
    "../menu/menuApi",
  )

  return {
    ...actual,
    useGetOrdersQuery: () => getOrdersState,
    useClearOrdersMutation: () => [
      clearOrdersMock,
      { isLoading: false, error: undefined },
    ],
  }
})

const order = {
  id: "order-1",
  createdAt: "2026-03-14T12:00:00Z",
  status: "submitted",
  totalPrice: 17.98,
  items: [
    {
      menuItemId: "ff-1",
      name: "Classic Burger",
      photoUrl: "https://example.com/burger.jpg",
      quantity: 2,
      unitPrice: 8.99,
      lineTotal: 17.98,
    },
  ],
} as const satisfies Order

beforeEach(() => {
  clearOrdersMock.mockReset()
  getOrdersState.data = []
  getOrdersState.isLoading = false
  getOrdersState.error = undefined
  getOrdersState.isFetching = false
})

test("does not render clear history when there are no previous orders", () => {
  renderWithProviders(<HistoryPanel />)

  expect(
    screen.queryByRole("button", { name: "Clear History" }),
  ).not.toBeInTheDocument()
})

test("renders history items with images and clears history", async () => {
  getOrdersState.data = [order]
  clearOrdersMock.mockReturnValue({
    unwrap: vi.fn().mockResolvedValue(undefined),
  })

  const { user } = renderWithProviders(<HistoryPanel />)

  expect(screen.getByText("Classic Burger")).toBeInTheDocument()
  expect(screen.getByRole("img", { name: "Classic Burger" })).toHaveAttribute(
    "src",
    "https://example.com/burger.jpg",
  )

  await user.click(screen.getByRole("button", { name: "Clear History" }))

  expect(clearOrdersMock).toHaveBeenCalledTimes(1)
})
