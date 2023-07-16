import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import { Button, Form, Row, Stack } from "react-bootstrap";
import { genres, years } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import { setSearchedText } from "../redux/features/books/bookSlice";

const AllBooks = () => {
  const { data: bookData, isLoading, error } = useGetBooksQuery(undefined);
  // console.log(bookData);
  const { searchedText } = useAppSelector((state) => state.book)
  const dispatch = useAppDispatch();

  let books;
  if (searchedText) {
    books = bookData?.data?.filter((book: any) =>
      book?.title?.toLowerCase().includes(searchedText.toLowerCase())
    );
  }
  else{
    books = bookData?.data
  }

  return (
    <>
      <Stack direction="horizontal" gap={3} className="mb-5 mx-5 px-5">
        <Form.Select style={{ flex: 1 }}>
          <option>Select Genre</option>
          {genres?.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>
        <Form.Select style={{ flex: 1 }}>
          <option>Select Publication Year</option>
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
            onChange={(e) => dispatch(setSearchedText(e.target.value)) }
          />
          <Button variant="primary">Search</Button>
        </Form>
      </Stack>

      <Row>
        {books?.map((book, i) => (
          <div className="col-md-4 col-lg-3">
            <Card>
              <div className="d-flex">
                <img
                  src={book?.image}
                  alt="fgfgggggg"
                  className="img-fluid"
                  width="130"
                  height="auto"
                />
                <Card.Body style={{ minWidth: 0 }}>
                  <Card.Title className="text-truncate">
                    {book?.title}
                  </Card.Title>
                  <Card.Text className="mb-0">{book?.author}</Card.Text>
                  <Card.Text className="text-muted mb-0">
                    {" "}
                    {book?.genre}
                  </Card.Text>
                  <div className="my-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-warning"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-warning"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-warning"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-warning"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-warning"
                    ></FontAwesomeIcon>
                  </div>
                  <Card.Text className="fw-bold mb-1">${book?.price}</Card.Text>
                  <div className="">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-success me-2"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="me-4 text-danger"
                    ></FontAwesomeIcon>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </div>
        ))}
      </Row>
    </>
  );
};

export default AllBooks;
