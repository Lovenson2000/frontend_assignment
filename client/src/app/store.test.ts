beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})

test("hydrates cart state from localStorage when creating a store", async () => {
  localStorage.setItem(
    "cart-items",
    JSON.stringify([
      {
        menuItemId: "ff-1",
        name: "Classic Burger",
        photoUrl: "https://example.com/burger.jpg",
        quantity: 2,
        unitPrice: 8.99,
      },
    ]),
  )

  const { makeStore } = await import("./store")
  const store = makeStore()

  expect(store.getState().cart.items).toEqual([
    {
      menuItemId: "ff-1",
      name: "Classic Burger",
      photoUrl: "https://example.com/burger.jpg",
      quantity: 2,
      unitPrice: 8.99,
    },
  ])
})

test("persists cart changes to localStorage through the shared store subscription", async () => {
  const { store } = await import("./store")
  const { addToCart } = await import("../features/cart/cartSlice")

  store.dispatch(
    addToCart({
      menuItemId: "ff-1",
      name: "Classic Burger",
      photoUrl: "https://example.com/burger.jpg",
      unitPrice: 8.99,
    }),
  )

  expect(JSON.parse(localStorage.getItem("cart-items") ?? "[]")).toEqual([
    {
      menuItemId: "ff-1",
      name: "Classic Burger",
      photoUrl: "https://example.com/burger.jpg",
      quantity: 1,
      unitPrice: 8.99,
    },
  ])
})
