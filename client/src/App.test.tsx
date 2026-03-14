import { screen } from "@testing-library/react"
import { renderWithProviders } from "./utils/test-utils"
import { App } from "./App"

vi.mock("./features/menu/menu", () => ({
  default: () => <section aria-label="Menu">Mocked menu</section>,
}))

test("renders navbar with menu active by default", () => {
  renderWithProviders(<App />)

  expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
    "aria-current",
    "page",
  )
  expect(screen.getByRole("button", { name: "History" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Menu" })).toBeInTheDocument()
})
