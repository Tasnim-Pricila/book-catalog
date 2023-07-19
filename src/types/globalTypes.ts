export interface IReviews {
  _id?: string;
  user_id?: string;
  user_image?: string;
  rating?: string;
  comment: string;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  image?: string;
  price?: number;
  createdBy: string;
  reviews?: IReviews[] | undefined
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  wishlist?: IBook[] | undefined;
  completedBooks?: IBook[] | undefined;
  currentlyReading?: IBook[] | undefined;
}

export interface IAllResponse<T> {
  status: boolean;
  data: T[] | undefined;
}
export interface IResponse<T> {
//   status: boolean;
  data: T | undefined;
}
export interface ICreateResponse {
  status: boolean;
  data: object;
}
