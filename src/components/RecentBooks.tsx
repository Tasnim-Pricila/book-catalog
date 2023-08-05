import { Col, Row } from "react-bootstrap";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import BookCard from "./BookCard";
import Loading from "../shared/Loading";
import CustomHeading from "../shared/CustomHeading";

const RecentBooks = () => {
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  const reversedBooks = bookData?.data?.slice().reverse();

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <>
      <CustomHeading
        smallTitle="Read New"
        headTitle="Recently Added"
        paragraph="Reading helps you developing your communication skills "
      />
      <Row className="justify-content-center mx-md-5 mx-1">
        {reversedBooks?.slice(0, 10).map((book: IBook, i: number) => (
          <Col sm={6} lg={4} xl={3} className="mb-3" key={i}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RecentBooks;
