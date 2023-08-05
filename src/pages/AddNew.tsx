import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { genres } from "../utils/constants";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../redux/features/hook";
import { IBook, IError } from "../types/globalTypes";
import { useCreateBookMutation } from "../redux/features/books/bookApi";
import ToastMessage from "../shared/ToastMessage";
import { useNavigate } from "react-router-dom";
import "./AddNew.css";
import CustomHeading from "../shared/CustomHeading";
import CustomBreadCrumb from "../shared/CustomBreadCrumb";

const AddNew = () => {
  const navigate = useNavigate();
  const [createBook, { isSuccess, isError, error }] = useCreateBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (isSuccess) {
      handleShow();
      setTimeout(() => {
        navigate("/allbooks");
      }, 1500);
    }
    if (isError) {
      handleShow();
    }
  }, [isSuccess, navigate, isError]);

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

    const data: IBook = {
      title: target.title.value,
      author: target.author.value,
      genre: target.genre.value,
      publication_date: target.publication_date.value,
      price: target.price.value,
      image: target.image.value,
      createdBy: user.email!,
    };

    createBook(data)
      .then(() => {
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const errorMessage = (error as IError)?.error as string;

  return (
    <div>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Book created successfully" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />
      <CustomBreadCrumb Menu1="Home" Menu2="All Books" activeMenu="Add New" />
      <Stack className="background-banner justify-content-center">
        <div className="add-book-card px-3 px-sm-5 pb-5 m-5 mx-auto shadow border-none rounded-3 bg-form">
          <CustomHeading headTitle="Add New Book" />

          <Form onSubmit={handleSumbit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2" controlId="bookTitle">
                  <Form.Label className="fw-bold">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
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
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2" controlId="bookGenre">
                  <Form.Label className="fw-bold">Genre</Form.Label>
                  <Form.Select name="genre" required>
                    <option value="">Select genre</option>
                    {genres?.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-2" controlId="bookPublicationYear">
                  <Form.Label className="fw-bold">Publication Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="publication_date"
                    placeholder="Enter publication date"
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
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="image">
              <Form.Label className="fw-bold">Image Link</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter image link"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Add Book
            </Button>
          </Form>
        </div>
      </Stack>
    </div>
  );
};

export default AddNew;
