import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/features/hook";
import { FormEvent } from "react";
import { IReviews } from "../types/globalTypes";
import {
  useEditBookMutation,
  useGetBookByIdQuery,
} from "../redux/features/books/bookApi";
import DeleteBookModal from "../components/DeleteBookModal";
import userImage from "../../src/assets/images/user.png";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookData } = useGetBookByIdQuery(id!);

  const [editBook] = useEditBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data: userData } = useGetUserByEmailQuery(user.email!);
  const book = bookData?.data;
  const reviews: IReviews[] | undefined = bookData?.data?.reviews ?? [];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      comment: { value: string };
    };
    const t = e.target as HTMLFormElement;

    const comment = {
      user_id: userData?.data?.firstName,
      comment: target.comment.value,
    };
    const data = {
      reviews: [...reviews, comment],
    };
    editBook({ id, data })
      .then(() => {
        console.log("");
      })
      .catch((error) => {
        console.log(error);
      });

    t.reset();
  };

  return (
    <div>
      <Row>
        <Col xs={12} sm={2}>
          <img
            src={book?.image}
            alt="Book"
            className="img-fluid border border-primary"
            height="250"
            width="250"
          />
        </Col>
        <Col xs={12} sm={8}>
          <h2>{book?.title}</h2>
          <p>
            <strong>Author:</strong> {book?.author}
          </p>
          <p>
            <strong>Price:</strong> {book?.price}
          </p>
          <p>
            <strong>Genre:</strong> {book?.genre}
          </p>
          <p>
            <strong>Publication Date:</strong> {book?.publication_date}
          </p>
          {book?.createdBy === user?.email && (
            <>
              <Button onClick={() => navigate(`/editbook/${book._id!}`)}>
                Edit Book
              </Button>{" "}
              <DeleteBookModal id={id!} />
            </>
          )}
        </Col>
      </Row>

      {user?.email && (
        <Row className="w-50">
          <h3 className="mt-3">Reviews: </h3>
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
        <Row key={review._id} className="my-4 align-items-center border">
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
