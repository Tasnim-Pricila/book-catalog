import { IAllResponse, IBook, IResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

export interface IEditBook {
  id: string | undefined;
  data: Partial<IBook> | undefined;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IAllResponse<IBook>, void>({
      query: () => "/books",
    }),

    getBookById: builder.query<IResponse<IBook>, string>({
      query: (id) => `/book/${id}`,
      providesTags: ["comment"],
    }),

    createBook: builder.mutation<object, IBook>({
      query: (data) => ({
        url: "/book",
        method: "POST",
        body: data,
      }),
    }),

    editBook: builder.mutation<object, IEditBook>({
      query: ({ id, data }) => ({
        url: `/book/${id!}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["comment"],
    }),

    deleteBook: builder.mutation<object, string>({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
