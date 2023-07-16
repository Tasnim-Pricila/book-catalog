import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../redux/api/apiSlice";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookData, isLoading, error } = useGetBookByIdQuery(id);
  const book = bookData?.data;
  console.log(book);
  const reviews = bookData?.data?.reviews;
  return (
    <div>
      <Row>
        <Col xs={12} sm={4}>
          <img src={book?.image} alt="Book" className="img-fluid" />
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
          <Button onClick={() => navigate(`/editbook/${book?._id}`)}>
            Edit Book
          </Button>{" "}
          <Button variant="danger">Delete Book</Button>
        </Col>
      </Row>

      {reviews?.map((review) => (
        <Row key={review._id} className="my-4">
          <Col md={2}>
            {/* <Media> */}
            <img
              src={review.userImage}
              alt={review.user_id}
              className="mr-3 rounded-circle"
              style={{ width: "64px", height: "64px" }}
            />
            {/* </Media> */}
          </Col>
          <Col md={10}>
            <h5>{review.user_id}</h5>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default BookDetails;
