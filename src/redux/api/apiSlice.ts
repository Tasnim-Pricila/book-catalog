import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ['comment', 'wishlist'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ['comment']
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
      }),
      invalidatesTags: ['comment']
    }),
    deleteBook : builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      })
    }),

    createUser : builder.mutation({
      query: (data) => ({
        url: '/user',
        method: 'POST',
        body: data
      })
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`
    }),
    getUserByEmail: builder.query({
      query: (email) => `/user/${email}`,
      providesTags: ['wishlist']
    }),
    updateUser : builder.mutation({
      query: ({id, data}) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['wishlist']
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useCreateBookMutation, useEditBookMutation , useDeleteBookMutation, useCreateUserMutation, useGetUserByEmailQuery, useUpdateUserMutation } = api;
