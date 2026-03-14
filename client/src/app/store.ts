import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { cartReducer } from "../features/cart/cartSlice"
import { menuApi } from "../features/menu/menuApi"
import { menuReducer } from "../features/menu/menuSlice"

const CART_STORAGE_KEY = "cart-items"

// THIS WAY, MORE REDUCERS CAN BE ADDED IN THE FUTURE WITHOUT CHANGING THIS FILE
const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  [menuApi.reducerPath]: menuApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

const loadCartPreloadedState = (): Partial<RootState> | undefined => {
  if (typeof window === "undefined") {
    return undefined
  }

  const storedCartItems = window.localStorage.getItem(CART_STORAGE_KEY)

  if (!storedCartItems) {
    return undefined
  }

  try {
    const items = JSON.parse(storedCartItems)

    if (!Array.isArray(items)) {
      return undefined
    }

    return {
      cart: {
        items,
      },
    }
  } catch {
    return undefined
  }
}

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(menuApi.middleware),
    preloadedState: preloadedState ?? loadCartPreloadedState(),
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]

export const store = makeStore()

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const { items } = store.getState().cart
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  })
}
