import { Col, Row } from "react-bootstrap";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import BookCard from "./BookCard";
import Loading from "../shared/Loading";

const RecentBooks = () => {
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  const reversedBooks = bookData?.data?.slice().reverse()

  if(isLoading){
    return <Loading/>
  }

  return (
    <>
      <Row>
        {reversedBooks?.slice(0, 10).map((book: IBook, i: number) => (
          <Col md={4} lg={3} className="mb-3" key={i}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RecentBooks;
