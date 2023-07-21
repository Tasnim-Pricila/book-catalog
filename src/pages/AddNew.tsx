import { Button, Form } from "react-bootstrap";
import { genres } from "../utils/constants";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../redux/features/hook";
import { IBook, IError } from "../types/globalTypes";
import { useCreateBookMutation } from "../redux/features/books/bookApi";
import ToastMessage from "../shared/ToastMessage";
import { useNavigate } from "react-router-dom";

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

  const errorMessage = (error as IError)?.error as string

  return (
    <div>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Book created successfully" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />

      <Form onSubmit={handleSumbit}>
        <Form.Group className="mb-2" controlId="bookTitle">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="bookAuthor">
          <Form.Label className="fw-bold">Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            placeholder="Enter author"
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="bookGenre">
          <Form.Label className="fw-bold">Genre</Form.Label>
          <Form.Control as="select" name="genre" required>
            <option value="">Select genre</option>
            {genres?.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-2" controlId="bookPublicationYear">
          <Form.Label className="fw-bold">Publication Date</Form.Label>
          <Form.Control
            type="date"
            name="publication_date"
            placeholder="Enter publication date"
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="price">
          <Form.Label className="fw-bold">Price</Form.Label>
          <Form.Control type="number" name="price" placeholder="Enter price" />
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
  );
};

export default AddNew;
