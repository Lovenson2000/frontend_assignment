import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem } from "../../lib/types"

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        item => item.menuItemId === action.payload.menuItemId,
      )

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push({
        ...action.payload,
        quantity: 1,
      })
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        cartItem => cartItem.menuItemId === action.payload,
      )

      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        cartItem => cartItem.menuItemId === action.payload,
      )

      if (!item) {
        return
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter(
          cartItem => cartItem.menuItemId !== action.payload,
        )
        return
      }

      item.quantity -= 1
    },
    clearCart: state => {
      state.items = []
    },
  },
})

export const { addToCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions
export const cartReducer = cartSlice.reducer
