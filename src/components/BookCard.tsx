import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faCircleCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { IBook, IUser } from "../types/globalTypes";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../redux/features/users/userApi";
import { useAppSelector } from "../redux/features/hook";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const userData: IUser = getUser?.data as IUser;
  const id = userData?._id;
  const userWishlist = userData?.wishlist;

  const completedBooks = userData?.completedBooks;
  const currentlyReading = userData?.currentlyReading;

  const addToWishlist = (book: IBook): void => {
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
  };

  const markAsRead = (book: IBook) => {
    const isExist = completedBooks?.find((list) => list._id === book._id);
    // console.log(isExist);
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
  };

  const readingNow = (book: IBook) => {
    const isExist = currentlyReading?.find((list) => list._id === book._id);
    // console.log(isExist);
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
  };

  return (
    <div>
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
            <Card.Title className="text-truncate">{book?.title}</Card.Title>
            <Card.Text className="mb-0">{book?.author}</Card.Text>
            <Card.Text className="mb-0">{book?.publication_date}</Card.Text>
            <Card.Text className="text-muted mb-0"> {book?.genre}</Card.Text>
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
                {userWishlist?.find((wishlist) => wishlist._id === book._id) ? (
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
    </div>
  );
};

export default BookCard;