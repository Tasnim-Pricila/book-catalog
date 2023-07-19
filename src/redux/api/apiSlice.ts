import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAllResponse, IBook, IResponse, IUser } from "../../types/globalTypes";
export interface IEditBook {
  id: string | undefined,
  data: Partial<IBook> | undefined
}
export interface IUpdateUser {
  id: string | undefined,
  data: Partial<IUser> | Partial<IBook> | undefined
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ['comment', 'wishlist'],
  endpoints: (builder) => ({

    getBooks: builder.query<IAllResponse<IBook>, void>({
      query: () => "/books",
    }),

    getBookById: builder.query<IResponse<IBook>, string>({
      query: (id) => `/book/${id}`,
      providesTags: ['comment']
    }),

    createBook : builder.mutation<object, IBook>({
      query: (data) => ({
        url: '/book',
        method: 'POST',
        body: data
      })
    }),
   
    editBook : builder.mutation<object, IEditBook>({
      query: ({id, data}) => ({
        url: `/book/${id!}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['comment']
    }),

    deleteBook : builder.mutation<object, string>({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      })
    }),

    createUser : builder.mutation<object, IUser>({
      query: (data) => ({
        url: '/user',
        method: 'POST',
        body: data
      })
    }),

    getUserById: builder.query<IResponse<IUser>, string>({
      query: (id) => `/user/${id}`
    }),

    getUserByEmail: builder.query<IResponse<IUser>, string>({
      query: (email) => `/user/${email}`,
      providesTags: ['wishlist']
    }),

    updateUser : builder.mutation<object, IUpdateUser>({
      query: ({id, data}) => ({
        url: `/user/${id!}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['wishlist']
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useCreateBookMutation, useEditBookMutation , useDeleteBookMutation, useCreateUserMutation, useGetUserByEmailQuery, useUpdateUserMutation } = api;
