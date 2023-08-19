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
      className="mb-4 align-items-center border mx-2 mx-md-5 py-1 rounded-3"
    >
      <Col xs={4} sm={2} md={2} lg={1}>
        <img
          src={getUser?.data?.image ? getUser?.data?.image : userImage}
          alt={review?._id}
          className="mr-3 rounded-circle"
          style={{ width: "64px", height: "64px" }}
        />
      </Col>
      <Col xs={8} sm={10} md={10} lg={11}>
        <h6 className="mb-0 fw-bold">
          {(getUser?.data?.firstName || getUser?.data?.lastName)
            ? getUser?.data?.firstName + "" + getUser?.data?.lastName
            : review?.user_email}
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
