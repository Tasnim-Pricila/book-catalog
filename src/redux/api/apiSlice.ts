import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-rouge.vercel.app/api/v1",
  }),
  tagTypes: ["comment", "wishlist", "create", "delete"],

  endpoints: () => ({}),
});
