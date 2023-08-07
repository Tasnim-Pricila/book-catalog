import { useNavigate, useParams } from "react-router-dom";
import { genres } from "../utils/constants";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useEffect, useState, FormEvent } from "react";
import { IError } from "../types/globalTypes";
import {
  useEditBookMutation,
  useGetBookByIdQuery,
} from "../redux/features/books/bookApi";
import ToastMessage from "../shared/ToastMessage";
import CustomBreadCrumb from "../shared/CustomBreadCrumb";
import CustomHeading from "../shared/CustomHeading";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookData } = useGetBookByIdQuery(id!);
  const [editBook, { isSuccess, isError, error }] = useEditBookMutation();
  const [selectedOption, setSelectedOption] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const book = bookData?.data;

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      author: { value: string };
      genre: { value: string };
      publication_date: { value: string };
      price: { value: number };
      image: { value: string };
    };
    const data = {
      title: target.title.value,
      author: target.author.value,
      genre: target.genre.value,
      publication_date: target.publication_date.value,
      price: target.price.value,
      image: target.image.value,
    };
    const bookId = id;
    editBook({ bookId, data })
      .then(() => {
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (book) {
      setSelectedOption(book.genre);
    }
  }, [book]);

  useEffect(() => {
    if (isSuccess) {
      handleShow();
      setTimeout(() => {
        navigate(`/bookdetails/${id!}`);
      }, 1500);
    }
    if (isError) {
      handleShow();
    }
  }, [isSuccess, id, isError, navigate]);
  
  const errorMessage = (error as IError)?.data?.message;

  return (
    <div>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Book updated successfully" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />
      <CustomBreadCrumb Menu1="Home" Menu2="All Books" activeMenu="Edit Book" />
      <Stack className="background-banner justify-content-center">
      <div className="add-book-card px-3 px-sm-5 pb-5 m-5 mx-auto shadow border-none rounded-3 bg-form">
          <CustomHeading headTitle="Edit Book" />
          <Form onSubmit={handleSumbit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2" controlId="bookTitle">
                  <Form.Label className="fw-bold">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    defaultValue={book?.title}
                    onChange={(e) => console.log(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2" controlId="bookAuthor">
                  <Form.Label className="fw-bold">Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    placeholder="Enter author"
                    defaultValue={book?.author}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2" controlId="bookGenre">
                  <Form.Label className="fw-bold">Genre</Form.Label>
                  <Form.Control
                    as="select"
                    name="genre"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    required
                  >
                    <option value="">Select genre</option>
                    {genres?.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2" controlId="bookPublicationYear">
                  <Form.Label className="fw-bold">Publication Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="publication_date"
                    placeholder="Enter publication date"
                    defaultValue={book?.publication_date?.slice(0, 10)}
                    // onChange={(e) => console.log(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2" controlId="price">
              <Form.Label className="fw-bold">Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                defaultValue={book?.price}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="image">
              <Form.Label className="fw-bold">Image Link</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter image link"
                defaultValue={book?.image}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Update Book
            </Button>
          </Form>
        </div>
      </Stack>
    </div>
  );
};

export default EditBook;
