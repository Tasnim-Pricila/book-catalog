import {
  Button,
  Card,
  Col,
  Image,
  Modal,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from "../redux/api/apiSlice";
import { useState, useEffect } from "react";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookData, error } = useGetBookByIdQuery(id);
  const book = bookData?.data;
  // console.log(book);
  const reviews = bookData?.data?.reviews;
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [deleteBook, { isSuccess, isLoading }] = useDeleteBookMutation();
  const handleDelete = async () => {
    await deleteBook(id);
  };
  console.log(deleteBook);
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setShow(false);
      navigate("/allbooks");
    }
  }, [isSuccess, isLoading]);

  return (
    <div>
      {/* {!isLoading && isSuccess && (
        <ToastContainer position="top-end" className="mt-5 me-5">
          <Toast bg="success" autohide={true}>
            <Toast.Body className="text-white">
              Book deleted successfully
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )} */}
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
          <Button variant="danger" onClick={handleShow}>
            Delete Book
          </Button>
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

      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleDelete()}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookDetails;
