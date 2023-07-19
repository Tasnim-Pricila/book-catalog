import { IBook, IResponse, IUser } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

export interface IUpdateUser {
  id: string | undefined;
  data: Partial<IUser> | Partial<IBook> | undefined;
}

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<object, IUser>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),

    getUserById: builder.query<IResponse<IUser>, string>({
      query: (id) => `/user/${id}`,
    }),

    getUserByEmail: builder.query<IResponse<IUser>, string>({
      query: (email) => `/user/${email}`,
      providesTags: ["wishlist"],
    }),

    updateUser: builder.mutation<object, IUpdateUser>({
      query: ({ id, data }) => ({
        url: `/user/${id!}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} = userApi;
