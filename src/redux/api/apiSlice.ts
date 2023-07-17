import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["comments"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (id) => `/book/${id}`,
    }),
    createBook : builder.mutation({
      query: (data) => ({
        url: '/book',
        method: 'POST',
        body: data
      })
    }),
    editBook : builder.mutation({
      query: ({id, data}) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: data
      })
    })
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useCreateBookMutation, useEditBookMutation  } = api;
