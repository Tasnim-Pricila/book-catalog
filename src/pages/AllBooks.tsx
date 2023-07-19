import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { genres, years } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import {
  setGenre,
  setPublicationDate,
  setSearchedText,
} from "../redux/features/books/bookSlice";
import { Link } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { useGetBooksQuery } from "../redux/features/books/bookApi";

import BookCard from "../components/BookCard";

const AllBooks = () => {
  const dispatch = useAppDispatch();
  const { data: bookData } = useGetBooksQuery(undefined);
  const { searchedText, genre, publicationDate } = useAppSelector(
    (state) => state.book
  );
  const { user } = useAppSelector((state) => state.user);

  let books: IBook[] | undefined;
  if (searchedText) {
    books = bookData?.data?.filter(
      (book) =>
        book?.title?.toLowerCase().includes(searchedText.toLowerCase()) ||
        book?.author?.toLowerCase().includes(searchedText.toLowerCase()) ||
        book?.genre?.toLowerCase().includes(searchedText.toLowerCase())
    );
  } else if (genre && publicationDate) {
    books = bookData?.data?.filter(
      (book) =>
        book?.genre?.toLowerCase() === genre.toLowerCase() &&
        book?.publication_date?.substr(4) === publicationDate
    );
  } else if (genre) {
    books = bookData?.data?.filter(
      (book) => book?.genre?.toLowerCase() === genre.toLowerCase()
    );
  } else if (publicationDate) {
    books = bookData?.data?.filter(
      (book) => book?.publication_date?.substr(4) === publicationDate
    );
  } else {
    books = bookData?.data;
  }

  return (
    <>
      <Stack direction="horizontal" gap={3} className="mb-5 mx-5 px-5">
        <Form.Select
          style={{ flex: 1 }}
          onChange={(e) => dispatch(setGenre(e.target.value))}
        >
          <option key="" value="">
            Select Genre
          </option>
          {genres?.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          style={{ flex: 1 }}
          onChange={(e) => dispatch(setPublicationDate(e.target.value))}
        >
          <option key="" value="">
            Select Publication Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Form.Select>
        <Form className="d-flex" style={{ flex: 1 }}>
          <Form.Control
            type="search"
            placeholder="Search Here..."
            className="me-2 border border-primary"
            aria-label="Search"
            onChange={(e) => dispatch(setSearchedText(e.target.value))}
          />
          <Button variant="primary">Search</Button>
        </Form>
        {user.email && (
          <Button variant="success">
            <Link to="/addnew" className="text-decoration-none text-white">
              + Add New
            </Link>
          </Button>
        )}
      </Stack>

      <Row>
        {books?.map((book: IBook, i: number) => (
          <Col md={4} lg={3} className="mb-3" key={i}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AllBooks;
