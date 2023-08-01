import { Button, Col, Form, Row } from "react-bootstrap";
import { IReviews } from "../types/globalTypes";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../redux/features/hook";
import { useEditBookMutation } from "../redux/features/books/bookApi";
import CustomHeading from "../shared/CustomHeading";
import { Rating } from "react-simple-star-rating";
import ReviewCard from "./ReviewCard";

interface IProps {
  reviews: IReviews[];
  bookId: string;
}
const Reviews = ({ reviews, bookId }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [editBook, { isSuccess }] = useEditBookMutation();

  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating <= 0) {
      setError("Rating is required");
    } else {
      setError("");
      const target = e.target as typeof e.target & {
        comment: { value: string };
      };
      const t = e.target as HTMLFormElement;

      const comment = {
        user_email: user.email,
        rating: rating,
        // ratingLabel: rating,
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
    <>
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
        <ReviewCard review={review} />
      ))}
    </>
  );
};

export default Reviews;
