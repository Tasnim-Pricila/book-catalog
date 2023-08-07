export interface IReviews {
  _id?: string;
  user_email: string;
  rating: number;
  ratingLabel?: string;
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
  reviews?: IReviews[] | undefined;
  pdfFileUrl: string
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
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

export interface IError  {
  data: {
    message: string,
    statusCode: number
  }
  // error: FetchBaseQueryError | SerializedError | undefined

}
