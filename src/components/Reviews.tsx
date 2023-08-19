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
      <CustomHeading headTitle={`Reviews (${reviews?.length})`} />

      {user?.email && (
        <Form onSubmit={handleSubmit} className="d-flex">
          <Row className="mb-4 mx-1 mx-md-5 w-100">
            <Col xs={12} sm={6} md={4}>
              <Form.Control
                type="text"
                name="comment"
                placeholder="Write your comment"
                className="me-2 border border-primary"
                required
              />
            </Col>
            <Col xs={12} sm={6} md={4} className="ps-2 mt-2 mt-md-0">
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
            <Col xs={12} md={4}>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      {reviews.length > 0 ? (
        ""
      ) : (
        <p className="text-capitalize text-center fw-bold h6">No reviews yet</p>
      )}
      {reviews?.map((review) => (
        <ReviewCard review={review} />
      ))}
    </>
  );
};

export default Reviews;
