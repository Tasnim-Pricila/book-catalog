import { Col, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { IReviews } from "../types/globalTypes";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import userImage from "../../src/assets/images/user.png";

const ReviewCard = ({ review }: { review: IReviews }) => {
  const { data: getUser } = useGetUserByEmailQuery(review.user_email);

  return (
    <Row
      key={review._id}
      className="mb-4 align-items-center border mx-2 mx-md-5"
    >
      <Col md={1}>
        <img
          src={getUser?.data?.image ? getUser?.data?.image : userImage}
          alt={review?._id}
          className="mr-3 rounded-circle"
          style={{ width: "64px", height: "64px" }}
        />
      </Col>
      <Col md={10}>
        <h6 className="mb-0">
          {getUser?.data?.firstName} {getUser?.data?.lastName}
        </h6>
        <Rating
          allowFraction
          initialValue={review?.rating}
          size={20}
          readonly
        />
        <p className="mb-0">{review?.comment}</p>
      </Col>
    </Row>
  );
};

export default ReviewCard;
