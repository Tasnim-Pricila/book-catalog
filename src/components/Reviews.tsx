import { Button, Col, Form, Row } from "react-bootstrap";
import userImage from "../../src/assets/images/user.png";
import { IReviews } from "../types/globalTypes";
import { FormEvent } from "react";
import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import { useEditBookMutation } from "../redux/features/books/bookApi";
import CustomHeading from "../shared/CustomHeading";

interface IProps {
  reviews: IReviews[];
  bookId: string;
}
const Reviews = ({ reviews, bookId }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const [editBook] = useEditBookMutation();

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
  return (
    <div>
      <CustomHeading headTitle="Reviews" />
      {reviews.length > 0 ? (
        ""
      ) : (
        <p className="text-capitalize text-center fw-bold h6">No reviews yet</p>
      )}
      {user?.email && (
        <Row className="mb-4 mx-1 mx-md-5">
          <Col xs={12} md={8}>
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
          </Col>
        </Row>
      )}

      {reviews?.map((review) => (
        <Row key={review._id} className="mb-4 align-items-center border mx-2 mx-md-5">
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

export default Reviews;
