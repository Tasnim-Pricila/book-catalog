import { useParams } from "react-router-dom";
import { IBook, IReviews } from "../types/globalTypes";
import {
  useGetBookByIdQuery,
  useGetBooksQuery,
} from "../redux/features/books/bookApi";
import Loading from "../shared/Loading";
import BookDetailRow from "../components/BookDetailRow";
import Reviews from "../components/Reviews";

const BookDetails = () => {
  const { id: bookId } = useParams();
  const { data: allBooks } = useGetBooksQuery(undefined);
  const { data: bookData, isLoading } = useGetBookByIdQuery(bookId!);
  const book: IBook = bookData?.data as IBook;
  const reviews: IReviews[] | undefined = bookData?.data?.reviews ?? [];

  const removeSelectedBooks = allBooks?.data?.filter(
    (book) => book._id !== bookData?.data?._id
  );
  const relatedBooks: IBook[] | undefined = removeSelectedBooks?.filter(
    (book) =>
      book.genre === bookData?.data?.genre ||
      book.author === bookData?.data?.author
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <BookDetailRow book={book} relatedBooks={relatedBooks} />
      <Reviews reviews={reviews} bookId={bookId!} />
    </div>
  );
};

export default BookDetails;
