import {
  Button,
  Card,
  Col,
  Form,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/features/hook";
import { FormEvent, useEffect, useState } from "react";
import { IBook, IError, IReviews, IUser } from "../types/globalTypes";
import {
  useEditBookMutation,
  useGetBookByIdQuery,
  useGetBooksQuery,
} from "../redux/features/books/bookApi";
import DeleteBookModal from "../components/DeleteBookModal";
import userImage from "../../src/assets/images/user.png";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../redux/features/users/userApi";
import Loading from "../shared/Loading";
import { isValidUrl } from "../utils/customFunction";
import demoImage from "../../src/assets/images/book.jpg";
import Slider from "react-slick";
import CustomHeading from "../shared/CustomHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faCircleCheck,
  faEdit,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import ToastMessage from "../shared/ToastMessage";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id: bookId } = useParams();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { data: allBooks } = useGetBooksQuery(undefined);
  const { data: bookData, isLoading } = useGetBookByIdQuery(bookId!);
  const [editBook] = useEditBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();

  const book = bookData?.data as IBook;
  const reviews: IReviews[] | undefined = bookData?.data?.reviews ?? [];

  const userData: IUser = getUser?.data as IUser;
  const id = userData?._id;
  const userWishlist = userData?.wishlist;
  const completedBooks = userData?.completedBooks;
  const currentlyReading = userData?.currentlyReading;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      comment: { value: string };
    };
    const t = e.target as HTMLFormElement;

    const comment = {
      user_id: getUser?.data?.firstName,
      comment: target.comment.value,
    };
    const data = {
      reviews: [...reviews, comment],
    };
    editBook({ bookId, data })
      .then(() => {
        console.log("");
      })
      .catch((error) => {
        console.log(error);
      });

    t.reset();
  };

  useEffect(() => {
    if (isSuccess || isError) {
      handleShow();
    }
  }, [isSuccess, isError]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true, // Enable vertical sliding
    verticalSwiping: true, // Enable vertical swiping
  };

  const addToWishlist = (book: IBook) => {
    if (user?.email) {
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
            //   console.log(data);
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
        //   console.log(data);
        updateUser({ id, data })
          .then(() => {
            //   console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate("/signin");
    }
  };

  const markAsRead = (book: IBook) => {
    if (user?.email) {
      const isExist = completedBooks?.find((list) => list._id === book._id);
      if (isExist) {
        const removeFromCompleted = completedBooks?.filter(
          (list) => list._id !== book._id
        );
        const data = {
          completedBooks: removeFromCompleted,
        };
        updateUser({ id, data })
          .then(() => {
            //   console.log(data);
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
            //   console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate("/signin");
    }
  };

  const readingNow = (book: IBook) => {
    if (user?.email) {
      const isExist = currentlyReading?.find((list) => list._id === book._id);
      if (isExist) {
        const removeFromReading = currentlyReading?.filter(
          (list) => list._id !== book._id
        );
        const data = {
          currentlyReading: removeFromReading,
        };
        updateUser({ id, data })
          .then(() => {
            //   console.log(data);
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
            //   console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate("/signin");
    }
  };
  const errorMessage = (error as IError)?.error as string;
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
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Changes Saved" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />

      <Row className="mt-3">
        <Col xs={12} sm={3}>
          <Image
            src={isValidUrl(book.image!) ? book?.image : demoImage}
            alt="Book"
            // className="img-fluid"
            height="400"
            width="250"
          />
        </Col>
        <Col xs={12} sm={6}>
          <small>{book?.genre}</small>
          <h2 className="mt-2">{book?.title}</h2>
          <p className="mb-1">By {book?.author}</p>
          <p>Published on {book?.publication_date}</p>
          <p className="text-success fw-bold">${book?.price}</p>
          <p className="pe-5 text-justify w-75">
            Interdum velit laoreet id donec ultrices tincidunt. Purus faucibus
            ornare suspendisse sed. Vitae congue mauris rhoncus aenean vel. A
            cras semper auctor neque vitae tempus quam pellentesque nec.
          </p>
          <div>
            <>
              {userWishlist?.find((wishlist) => wishlist._id === book._id) ? (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>Remove From Wishlist</Tooltip>
                  )}
                >
                  <FontAwesomeIcon
                    role="button"
                    icon={faHeart}
                    className="me-4 text-danger"
                    onClick={() => addToWishlist(book)}
                  ></FontAwesomeIcon>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>Add To Wishlist</Tooltip>
                  )}
                >
                  <FontAwesomeIcon
                    role="button"
                    icon={faHeart}
                    className="me-4"
                    onClick={() => addToWishlist(book)}
                  ></FontAwesomeIcon>
                </OverlayTrigger>
              )}
            </>
            <>
              {completedBooks?.find(
                (completed) => completed._id === book._id
              ) ? (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>Mark as Unread</Tooltip>
                  )}
                >
                  <FontAwesomeIcon
                    role="button"
                    icon={faCircleCheck}
                    className="me-4 text-success"
                    onClick={() => markAsRead(book)}
                  ></FontAwesomeIcon>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>Mark as Read</Tooltip>
                  )}
                >
                  <FontAwesomeIcon
                    role="button"
                    icon={faCircleCheck}
                    className="me-4"
                    onClick={() => markAsRead(book)}
                  ></FontAwesomeIcon>
                </OverlayTrigger>
              )}
            </>
            <>
              {currentlyReading?.find((reading) => reading._id === book._id) ? (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Read Later </Tooltip>}
                >
                  <FontAwesomeIcon
                    role="button"
                    icon={faBookOpenReader}
                    className="me-4 text-primary"
                    onClick={() => readingNow(book)}
                  ></FontAwesomeIcon>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Reading Now</Tooltip>}
                >
                  <FontAwesomeIcon
                    role="button"
                    icon={faBookOpenReader}
                    className="me-4"
                    onClick={() => readingNow(book)}
                  ></FontAwesomeIcon>
                </OverlayTrigger>
              )}
            </>
          </div>

          {book?.createdBy === user?.email && (
            <div className="mt-3">
              <Button onClick={() => navigate(`/editbook/${book._id!}`)} className="me-2">
                <FontAwesomeIcon icon={faEdit} className="me-1"></FontAwesomeIcon>
                 Edit Book
              </Button>
              <DeleteBookModal id={id!} />
            </div>
          )}
        </Col>
        <Col xs={12} sm={3}>
          <h4>Related Books</h4>
          {
            relatedBooks && 
              relatedBooks?.length > 0 ? (
              <div style={{ width: "100%", height: "300px" }}>
                <Slider {...settings}>
                  {relatedBooks?.slice(0, 3).map((book) => (
                    <>
                      <Card className="mt-2">
                        <div className="d-flex">
                          <Image
                            role="button"
                            src={
                              isValidUrl(book.image!) ? book?.image : demoImage
                            }
                            alt="fgfgggggg"
                            className=""
                            width="100"
                            height="160"
                            onClick={() =>
                              navigate(`/bookdetails/${book._id!}`)
                            }
                          />
                          <Card.Body>
                            <h5 className="text-truncate d-inline-block mb-0">
                              {book?.title}
                            </h5>
                            <Card.Text className="text-truncate mb-0">
                              {book?.author}
                            </Card.Text>
                            <Card.Text className="mb-0">
                              {book?.publication_date}
                            </Card.Text>
                            <Card.Text className="text-muted mb-0">
                              {" "}
                              {book?.genre}
                            </Card.Text>
                            <Card.Text className="fw-bold">
                              ${book?.price}
                            </Card.Text>
                          </Card.Body>
                        </div>
                      </Card>
                    </>
                  ))}
                </Slider>
              </div>
            ): (
              <p> No Related Books found</p>
            )
           }
        </Col>
      </Row>

      <CustomHeading headTitle="Reviews" />
      {user?.email && (
        <Row className="w-50 mb-4">
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              type="text"
              name="comment"
              placeholder="Write your comment"
              className="me-2 border border-primary"
              required
            />
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </Form>
        </Row>
      )}
      {reviews?.map((review) => (
        <Row key={review._id} className="mb-4 align-items-center border">
          <Col md={1}>
            <img
              src={review.user_image ? review.user_image : userImage}
              alt={review.user_id}
              className="mr-3 rounded-circle"
              style={{ width: "64px", height: "64px" }}
            />
          </Col>
          <Col md={10}>
            <h6>{review.user_id}</h6>
            {/* <p>Rating: {review.rating}</p> */}
            <p className="mb-0">{review.comment}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default BookDetails;
