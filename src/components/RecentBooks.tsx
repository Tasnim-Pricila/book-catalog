import { Col, Row } from "react-bootstrap";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import BookCard from "./BookCard";

const RecentBooks = () => {
  const { data: bookData } = useGetBooksQuery(undefined);
  const reversedBooks = bookData?.data?.slice().reverse()

  return (
    <>
      <Row>
        {reversedBooks?.slice(0, 20).map((book: IBook, i: number) => (
          <Col md={4} lg={3} className="mb-3" key={i}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RecentBooks;
