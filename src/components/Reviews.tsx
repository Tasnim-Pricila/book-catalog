import { Button, Col, Form, Row } from "react-bootstrap";
import userImage from "../../src/assets/images/user.png";
import { IReviews } from "../types/globalTypes";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import { useEditBookMutation } from "../redux/features/books/bookApi";
import CustomHeading from "../shared/CustomHeading";
import { Rating } from "react-simple-star-rating";

interface IProps {
  reviews: IReviews[];
  bookId: string;
}
const Reviews = ({ reviews, bookId }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const [editBook, { isSuccess }] = useEditBookMutation();

  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating <= 0) {
      console.log("required");
      setError("Rating is required");
    } else {
      setError("");
      const target = e.target as typeof e.target & {
        comment: { value: string };
      };
      const t = e.target as HTMLFormElement;

      const comment = {
        user_id: getUser?.data?.firstName,
        rating: rating,
        comment: target.comment.value,
      };
      const data = {
        reviews: [...reviews, comment],
      };
      editBook({ bookId, data })
        .then(() => {
          // console.log("");
        })
        .catch((error) => {
          console.log(error);
        });

      t.reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setRating(0);
    }
  }, [isSuccess, rating]);

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
          <Col xs={12}>
            <Form onSubmit={handleSubmit} className="d-flex">
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="comment"
                  placeholder="Write your comment"
                  className="me-2 border border-primary"
                  required
                />
              </Col>
              <Col md={4} className="ps-2">
                <Rating
                  initialValue={rating}
                  size={30}
                  allowFraction
                  onClick={handleRating}
                  showTooltip
                  tooltipArray={[
                    "Terrible",
                    "Terrible+",
                    "Bad",
                    "Bad+",
                    "Average",
                    "Average+",
                    "Great",
                    "Great+",
                    "Awesome",
                    "Awesome+",
                  ]}
                  transition
                />
                <p className="ms-2 text-danger"> {error && error}</p>
              </Col>
              <Col>
                <Button type="submit" variant="outline-primary">
                  Submit
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      )}

      {reviews?.map((review) => (
        <Row
          key={review._id}
          className="mb-4 align-items-center border mx-2 mx-md-5"
        >
          <Col md={1}>
            <img
              src={review.user_image ? review.user_image : userImage}
              alt={review.user_id}
              className="mr-3 rounded-circle"
              style={{ width: "64px", height: "64px" }}
            />
          </Col>
          <Col md={10}>
            <h6 className="mb-0">{review?.user_id}</h6>
            <Rating
              allowFraction
              initialValue={review?.rating}
              size={20}
              readonly
            />
            <p className="mb-0">{review?.comment}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Reviews;
