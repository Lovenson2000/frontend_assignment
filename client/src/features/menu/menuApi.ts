import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { GetMenuResponse, MenuItem } from "../../lib/types"

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Menu"],
  endpoints: build => ({
    getMenuItems: build.query<MenuItem[], void>({
      query: () => "menu",
      transformResponse: (response: GetMenuResponse) => response.items,
      providesTags: ["Menu"],
    }),
  }),
})

export const { useGetMenuItemsQuery } = menuApi
