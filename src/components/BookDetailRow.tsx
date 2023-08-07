import {
  Button,
  Col,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import {
  isValidUrl,
  updateCompletedBooks,
  updateCurrentlyReading,
  updateWishlist,
} from "../utils/customFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faCircleCheck,
  faEdit,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import DeleteBookModal from "./DeleteBookModal";
import { useNavigate } from "react-router-dom";
import demoImage from "../../src/assets/images/book.jpg";
import { IBook, IError, IUser } from "../types/globalTypes";
import { useAppSelector } from "../redux/features/hook";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../redux/features/users/userApi";
import ToastMessage from "../shared/ToastMessage";
import { useState, useEffect } from "react";
import RelatedBooksSlider from "./RelatedBooksSlider";
import { Rating } from "react-simple-star-rating";

interface IProps {
  book: IBook;
  relatedBooks: IBook[] | undefined;
}

const BookDetailRow = ({ book, relatedBooks }: IProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [avgRating, setAvgRating] = useState(0);

  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();
  const userData: IUser = getUser?.data as IUser;
  const userWishlist = userData?.wishlist;
  const completedBooks = userData?.completedBooks;
  const currentlyReading = userData?.currentlyReading;

  const addToWishlist = (book: IBook) => {
    updateWishlist(user?.email, book, userWishlist, updateUser, navigate);
  };

  const markAsRead = (book: IBook) => {
    updateCompletedBooks(
      user?.email,
      book,
      completedBooks,
      updateUser,
      navigate
    );
  };

  const readingNow = (book: IBook) => {
    updateCurrentlyReading(
      user?.email,
      book,
      currentlyReading,
      updateUser,
      navigate
    );
  };

  const errorMessage = (error as IError)?.data?.message;
  useEffect(() => {
    if (isSuccess || isError) {
      handleShow();
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    let sum = 0;
    book?.reviews?.forEach((review) => {
      sum = sum + review.rating;
      setAvgRating(sum / book.reviews!.length);
    });
  }, [avgRating, book?.reviews]);

  return (
    <>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Changes Saved" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />
      <Row className="mt-5 mx-1 mx-md-5">
        <Col xs={12} md={5} lg={4} xl={3}>
          <Image
            src={isValidUrl(book.image!) ? book?.image : demoImage}
            alt="Book"
            height="100%"
            width="250"
            // className="img-fluid"
          />
        </Col>
        <Col xs={12} md={7} lg={5} xl={6}>
          <small className="text-muted">{book?.genre}</small>
          <h2 className="fw-bold">{book?.title}</h2>
          <p className="mb-1" style={{color:"#121823"}}>By {book?.author}</p>
          <p className="mb-0 text-muted">
            Published on {book?.publication_date?.slice(0, 10)}
          </p>
          <Rating
            allowFraction
            initialValue={avgRating}
            size={20}
            readonly
            className="mb-2"
          />
          <p className="h5 text-success fw-bold mb-3">${book?.price}</p>
          <p className="pe-5 text-justify">
            Interdum velit laoreet id donec ultrices tincidunt. Purus faucibus
            ornare suspendisse sed. Vitae congue mauris rhoncus aenean vel. A
            cras semper auctor neque vitae tempus quam pellentesque nec.
          </p>
          <div className="mt-4">
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
                    className="me-4 text-danger fa-2x"
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
                    className="me-4 fa-2x"
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
                    className="me-4 text-success fa-2x"
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
                    className="me-4 fa-2x"
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
                    className="me-4 text-primary fa-2x"
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
                    className="me-4 fa-2x"
                    onClick={() => readingNow(book)}
                  ></FontAwesomeIcon>
                </OverlayTrigger>
              )}
            </>
          </div>

          {book?.createdBy === user?.email && (
            <div className="d-flex mt-3 flex-wrap" style={{ gap: '8px'}}>
              <Button
                onClick={() => navigate(`/editbook/${book._id!}`)}
                className="me-2"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="me-1"
                ></FontAwesomeIcon>
                Edit Book
              </Button>
              <DeleteBookModal id={book._id!} />
            </div>
          )}
        </Col>
        <Col xs={12} md={12} lg={3} className="mt-5 mt-lg-0">
          <RelatedBooksSlider relatedBooks={relatedBooks} />
        </Col>
      </Row>
    </>
  );
};

export default BookDetailRow;
