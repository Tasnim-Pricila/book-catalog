import { Col, Row } from "react-bootstrap";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import BookCard from "./BookCard";
import Loading from "../shared/Loading";
import CustomHeading from "../shared/CustomHeading";
import './style.css'

const RecentBooks = () => {
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  const reversedBooks = bookData?.data?.slice().reverse();

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div className="card-background">
      <CustomHeading
        smallTitle="Read New"
        headTitle="Recently Added"
        paragraph="Reading helps you developing your communication skills "
      />
      <Row className="justify-content-center mx-md-5 mx-1 pb-5" >
        {reversedBooks?.slice(0, 8).map((book: IBook, i: number) => (
          <Col sm={6} lg={4} xl={3} className="mb-4" key={i}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecentBooks;
