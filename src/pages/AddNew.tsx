import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { genres } from "../utils/constants";
import { FormEvent } from "react";
import { useAppSelector } from "../redux/features/hook";
import { IBook } from "../types/globalTypes";
import { useCreateBookMutation } from "../redux/features/books/bookApi";

const AddNew = () => {
  const [createBook, { isSuccess }] =
    useCreateBookMutation();
  const { user } = useAppSelector((state) => state.user);

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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isSuccess && (
        <ToastContainer position="top-end" className="mt-5 me-5">
          <Toast bg="success" autohide={true}>
            <Toast.Body className="text-white">
              Book created successfully
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}

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
