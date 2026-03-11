import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { MenuItem } from "../../lib/types"

type MenuState = {
  items: MenuItem[]
}

const initialState: MenuState = {
  items: [],
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload
    },
    clearMenuItems: state => {
      state.items = []
    },
  },
})

export const { setMenuItems, clearMenuItems } = menuSlice.actions
export const menuReducer = menuSlice.reducer
