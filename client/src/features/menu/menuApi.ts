import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  GetMenuResponse,
  GetOrdersResponse,
  MenuItem,
  Order,
  PlaceOrderRequest,
  PlaceOrderResponse,
} from "../../lib/types"

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Menu", "Orders"],
  endpoints: build => ({
    getMenuItems: build.query<MenuItem[], void>({
      query: () => "menu",
      transformResponse: (response: GetMenuResponse) => response.items,
      providesTags: ["Menu"],
    }),
    getOrders: build.query<Order[], void>({
      query: () => "orders",
      transformResponse: (response: GetOrdersResponse) => response.orders,
      providesTags: ["Orders"],
    }),
    placeOrder: build.mutation<Order, PlaceOrderRequest>({
      query: body => ({
        url: "orders",
        method: "POST",
        body,
      }),
      transformResponse: (response: PlaceOrderResponse) => response.order,
      invalidatesTags: ["Orders"],
    }),
    clearOrders: build.mutation<void, void>({
      query: () => ({
        url: "orders",
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
})

export const {
  useGetMenuItemsQuery,
  useGetOrdersQuery,
  usePlaceOrderMutation,
  useClearOrdersMutation,
} = menuApi
