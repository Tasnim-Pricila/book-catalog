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

interface IProps {
  book: IBook;
  relatedBooks: IBook[] | undefined;
}

const BookDetailRow = ({ book, relatedBooks }: IProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();
  const userData: IUser = getUser?.data as IUser;
  const id = userData?._id;
  const userWishlist = userData?.wishlist;
  const completedBooks = userData?.completedBooks;
  const currentlyReading = userData?.currentlyReading;

  const addToWishlist = (book: IBook) => {
    updateWishlist(user?.email, book, userWishlist, updateUser, id, navigate);
  };

  const markAsRead = (book: IBook) => {
    updateCompletedBooks(
      user?.email,
      book,
      completedBooks,
      updateUser,
      id,
      navigate
    );
  };

  const readingNow = (book: IBook) => {
    updateCurrentlyReading(
      user?.email,
      book,
      currentlyReading,
      updateUser,
      id,
      navigate
    );
  };

  const errorMessage = (error as IError)?.error as string;
  useEffect(() => {
    if (isSuccess || isError) {
      handleShow();
    }
  }, [isSuccess, isError]);
  return (
    <>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Changes Saved" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />
      <Row className="mt-5 mx-1 mx-md-5">
        <Col xs={12} sm={3}>
          <Image
            src={isValidUrl(book.image!) ? book?.image : demoImage}
            alt="Book"
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
        <RelatedBooksSlider relatedBooks={relatedBooks} />
      </Row>
    </>
  );
};

export default BookDetailRow;
