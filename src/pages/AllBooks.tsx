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
import Loading from "../shared/Loading";
import CustomBreadCrumb from "../shared/CustomBreadCrumb";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useEffect, useState } from "react";

const AllBooks = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  const { searchedText, genre, publicationDate } = useAppSelector(
    (state) => state.book
  );
  const { user } = useAppSelector((state) => state.user);

  let books: IBook[] | undefined;

  if (genre && publicationDate && searchedText) {
    books = bookData?.data?.filter(
      (book) =>
        book?.genre?.toLowerCase() === genre.toLowerCase() &&
        book?.publication_date?.slice(0, 4) === publicationDate &&
        (book?.title?.toLowerCase().includes(searchedText.toLowerCase()) ||
          book?.author?.toLowerCase().includes(searchedText.toLowerCase()) ||
          book?.genre?.toLowerCase().includes(searchedText.toLowerCase()))
    );
  } else if (genre && publicationDate) {
    books = bookData?.data?.filter(
      (book) =>
        book?.genre?.toLowerCase() === genre.toLowerCase() &&
        book?.publication_date?.slice(0, 4) === publicationDate
    );
  } else if (genre && searchedText) {
    books = bookData?.data?.filter(
      (book) =>
        book?.genre?.toLowerCase() === genre.toLowerCase() &&
        (book?.title?.toLowerCase().includes(searchedText.toLowerCase()) ||
          book?.author?.toLowerCase().includes(searchedText.toLowerCase()) ||
          book?.genre?.toLowerCase().includes(searchedText.toLowerCase()))
    );
  } else if (publicationDate && searchedText) {
    books = bookData?.data?.filter(
      (book) =>
        book?.publication_date?.slice(0, 4) === publicationDate &&
        (book?.title?.toLowerCase().includes(searchedText.toLowerCase()) ||
          book?.author?.toLowerCase().includes(searchedText.toLowerCase()) ||
          book?.genre?.toLowerCase().includes(searchedText.toLowerCase()))
    );
  } else if (searchedText) {
    books = bookData?.data?.filter(
      (book) =>
        book?.title?.toLowerCase().includes(searchedText.toLowerCase()) ||
        book?.author?.toLowerCase().includes(searchedText.toLowerCase()) ||
        book?.genre?.toLowerCase().includes(searchedText.toLowerCase())
    );
  } else if (genre) {
    books = bookData?.data?.filter(
      (book) => book?.genre?.toLowerCase() === genre.toLowerCase()
    );
  } else if (publicationDate) {
    books = bookData?.data?.filter(
      (book) => book?.publication_date?.slice(0, 4) === publicationDate
    );
  } else {
    books = bookData?.data;
  }
  useEffect(() => {
    if (genre || publicationDate || searchedText) {
      setCurrentPage(1);
    }
  }, [genre, publicationDate, searchedText]);

  const length: number | undefined = books?.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(length! / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CustomBreadCrumb Menu1="Home" activeMenu="All Books" />

      <Stack
        gap={3}
        className="d-flex flex-md-row flex-column mb-5 px-md-5 mx-md-5 mx-2 mt-5"
      >
        <Form.Select
          style={{ flex: 1 / 2 }}
          value={genre}
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
          style={{ flex: 1 / 2 }}
          value={publicationDate}
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
            placeholder="Search By book name, author or genre..."
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

      <Row className="justify-content-center mx-md-5 mx-2">
        {books?.slice(startIndex, endIndex).map((book: IBook, i: number) => (
          <Col md={6} xl={3} className="mb-3" key={i}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
      <div className="my-5">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AllBooks;
