import { IAllResponse, IBook, IResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

export interface IEditBook {
  bookId: string | undefined;
  data: Partial<IBook> | undefined;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IAllResponse<IBook>, void>({
      query: () => "/books",
      providesTags: ["create", "delete", "comment"]
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
      invalidatesTags: ["create"]
    }),

    editBook: builder.mutation<object, IEditBook>({
      query: ({ bookId, data }) => ({
        url: `/book/${bookId!}`,
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
      invalidatesTags: ["delete"]
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
