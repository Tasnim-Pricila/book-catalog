import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import { Col, Row } from "react-bootstrap";

const RecentBooks = () => {
  const { data: bookData, isLoading, error } = useGetBooksQuery(undefined);
  // console.log(bookData);

  return (
    <>
      <Row>
        {bookData?.data?.map((book, i) => (
          <Col md={4} lg={3} key={i}>
            <Card>
              <div className="d-flex">
                <img
                  src={book?.image}
                  alt="fgfgggggg"
                  className="img-fluid"
                  width="130"
                  height="auto"
                />
                <Card.Body style={{ minWidth: 0 }}>
                  <Card.Title className="text-truncate">
                    {book?.title}
                  </Card.Title>
                  <Card.Text className="mb-0">{book?.author}</Card.Text>
                  <Card.Text className="text-muted mb-0">
                    {" "}
                    {book?.genre}
                  </Card.Text>
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
                  <div className="">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-success me-2"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="me-4 text-danger"
                    ></FontAwesomeIcon>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RecentBooks;
