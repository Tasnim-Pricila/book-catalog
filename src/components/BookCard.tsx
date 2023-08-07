import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { IBook, IError, IUser } from "../types/globalTypes";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../redux/features/users/userApi";
import { useAppSelector } from "../redux/features/hook";
import { useEffect, useState } from "react";
import ToastMessage from "../shared/ToastMessage";
import {  Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import demoImage from "../../src/assets/images/book.jpg";
import {
  goToTop,
  isValidUrl,
  updateCompletedBooks,
  updateCurrentlyReading,
  updateWishlist,
} from "../utils/customFunction";
import { Rating } from "react-simple-star-rating";
import "./style.css";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [avgRating, setAvgRating] = useState(0);

  const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const userData: IUser = getUser?.data as IUser;
  // const id = userData?._id;
  const userWishlist = userData?.wishlist;
  const completedBooks = userData?.completedBooks;
  const currentlyReading = userData?.currentlyReading;

  useEffect(() => {
    let sum = 0;
    book?.reviews?.forEach((review) => {
      sum = sum + review.rating;
      setAvgRating(sum / book.reviews!.length);
    });
  }, [avgRating, book?.reviews]);

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

  return (
    <div>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Changes Saved" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />
      <Card className="border-0 book-card">
        <div className="d-flex">
          <div className="image-container">
            <Image
              role="button"
              src={isValidUrl(book.image!) ? book?.image : demoImage}
              alt="fgfgggggg"
              className="rounded-3"
              width="150"
              height="100%"
              onClick={() => {navigate(`/bookdetails/${book._id!}`); goToTop()}}
            />
            <small
              className="image-text"
              onClick={() => {navigate(`/bookdetails/${book._id!}`); goToTop()}}
            >
              View Details
            </small>
          </div>

          <Card.Body style={{ minWidth: 0 }} className="px-2">
            <Card.Title className="text-truncate fw-bold">
              {book?.title}
            </Card.Title>

            <Card.Text
              className="text-truncate mb-0"
              style={{ color: "#121823" }}
            >
              {book?.author}
            </Card.Text>
            <Card.Text className="mb-0 text-muted">
              {book?.publication_date?.slice(0, 10)}
            </Card.Text>
            <Card.Text className="text-truncate text-muted mb-0">
              {" "}
              {book?.genre}
            </Card.Text>
            <div className="my-2">
              <Rating
                allowFraction
                initialValue={avgRating}
                size={20}
                readonly
              />
            </div>
            <Card.Text className="fw-bold mb-1">${book?.price}</Card.Text>
              <a href={book?.pdfFileUrl} target="_blank" className="my-1 d-inline-block text-decoration-none" >
                Read Now
              </a>

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
                {currentlyReading?.find(
                  (reading) => reading?._id === book._id
                ) ? (
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Read Later </Tooltip>
                    )}
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
                    overlay={(props) => (
                      <Tooltip {...props}>Reading Now</Tooltip>
                    )}
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
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default BookCard;
