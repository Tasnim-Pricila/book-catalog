import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  useGetBooksQuery,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../redux/api/apiSlice";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { genres, years } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import {
  setGenre,
  setPublicationDate,
  setSearchedText,
} from "../redux/features/books/bookSlice";
import { Link, useNavigate } from "react-router-dom";
import { IBook, IUser } from "../types/globalTypes";

const AllBooks = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: bookData } = useGetBooksQuery(undefined);
  const { searchedText, genre, publicationDate } = useAppSelector(
    (state) => state.book
  );
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const userData: IUser = getUser?.data as IUser;
  const id = userData?._id;
  const userWishlist = userData?.wishlist;
  const completedBooks = userData?.completedBooks;
  const currentlyReading = userData?.currentlyReading;

  const [updateUser] = useUpdateUserMutation();

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

  const addToWishlist = (book: IBook) => {
    const isExist = userWishlist?.find((list) => list._id === book._id);
    if (isExist) {
      const removeFromWishlist = userWishlist?.filter(
        (list) => list._id !== book._id
      );
      const data = {
        wishlist: removeFromWishlist,
      };
      updateUser({ id, data })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      const data = userWishlist
        ? {
            wishlist: [...userWishlist, book],
          }
        : {
            wishlist: [book],
          };
      updateUser({ id, data })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const markAsRead = (book: IBook) => {
    const isExist = completedBooks?.find((list) => list._id === book._id);
    console.log(isExist);
    if (isExist) {
      const removeFromCompleted = completedBooks?.filter(
        (list) => list._id !== book._id
      );
      const data = {
        completedBooks: removeFromCompleted,
      };
      updateUser({ id, data })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      const data = completedBooks
        ? {
            completedBooks: [...completedBooks, book],
          }
        : {
            completedBooks: [book],
          };
      updateUser({ id, data })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const readingNow = (book: IBook) => {
    const isExist = currentlyReading?.find((list) => list._id === book._id);
    console.log(isExist);
    if (isExist) {
      const removeFromReading = currentlyReading?.filter(
        (list) => list._id !== book._id
      );
      const data = {
        currentlyReading: removeFromReading,
      };
      updateUser({ id, data })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      const data = currentlyReading
        ? {
          currentlyReading: [...currentlyReading, book],
          }
        : {
          currentlyReading: [book],
          };
      updateUser({ id, data })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

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
            <Card>
              <div className="d-flex">
                <img
                  src={book?.image}
                  alt="fgfgggggg"
                  className="img-fluid"
                  width="130"
                  height="auto"
                  onClick={() => navigate(`/bookdetails/${book._id!}`)}
                />
                <Card.Body style={{ minWidth: 0 }}>
                  <Card.Title className="text-truncate">
                    {book?.title}
                  </Card.Title>
                  <Card.Text className="mb-0">{book?.author}</Card.Text>
                  <Card.Text className="mb-0">
                    {book?.publication_date}
                  </Card.Text>
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
                  <div>
                    <>
                      {userWishlist?.find(
                        (wishlist) => wishlist._id === book._id
                      ) ? (
                        <FontAwesomeIcon
                          role="button"
                          icon={faHeart}
                          className="me-4 text-danger"
                          onClick={() => addToWishlist(book)}
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          role="button"
                          icon={faHeart}
                          className="me-4"
                          onClick={() => addToWishlist(book)}
                        ></FontAwesomeIcon>
                      )}
                    </>
                    <>
                      {completedBooks?.find(
                        (completed) => completed._id === book._id
                      ) ? (
                        <FontAwesomeIcon
                          role="button"
                          icon={faCircleCheck}
                          className="me-4 text-success"
                          onClick={() => markAsRead(book)}
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          role="button"
                          icon={faCircleCheck}
                          className="me-4"
                          onClick={() => markAsRead(book)}
                        ></FontAwesomeIcon>
                      )}
                    </>
                    <>
                      {currentlyReading?.find(
                        (reading) => reading._id === book._id
                      ) ? (
                        <FontAwesomeIcon
                          role="button"
                          icon={faBookOpenReader}
                          className="me-4 text-primary"
                          onClick={() => readingNow(book)}
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          role="button"
                          icon={faBookOpenReader}
                          className="me-4"
                          onClick={() => readingNow(book)}
                        ></FontAwesomeIcon>
                      )}
                    </>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AllBooks;
