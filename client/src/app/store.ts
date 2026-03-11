import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { menuReducer } from "../features/menu/menuSlice"

// THIS WAY, MORE REDUCERS CAN BE ADDED IN THE FUTURE WITHOUT CHANGING THIS FILE
const rootReducer = combineReducers({
  menu: menuReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]

export const store = makeStore()
