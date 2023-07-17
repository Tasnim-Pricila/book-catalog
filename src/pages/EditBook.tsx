import { useParams } from "react-router-dom";
import { genres } from "../utils/constants";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import {
  useEditBookMutation,
  useGetBookByIdQuery,
} from "../redux/api/apiSlice";
import { useEffect, useState } from "react";

const EditBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading: bookDataLoading } =
    useGetBookByIdQuery(id);
  const book = !bookDataLoading && bookData?.data;

  const [editBook, { isLoading, isError, isSuccess }] = useEditBookMutation();
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (book) {
      setSelectedOption(book.genre);
    }
  }, [book]);

  const handleSumbit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      author: e.target.author.value,
      genre: selectedOption,
      publication_date: e.target.publicationDate.value,
      price: e.target.price.value,
      image: e.target.image.value,
    };
    // console.log(data);
    editBook({ id, data });
  };

  return (
    <div>
      {isSuccess && (
        <ToastContainer position="top-end" className="mt-5 me-5">
          <Toast bg="success" autohide={true}>
            <Toast.Body className="text-white">
              Book updated successfully
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <h1 className="mb-4">Edit Book</h1>
      <Form onSubmit={handleSumbit}>
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

        <Form.Group className="mb-2" controlId="bookPublicationYear">
          <Form.Label className="fw-bold">Publication Date</Form.Label>
          <Form.Control
            type="date"
            name="publicationDate"
            placeholder="Enter publication date"
            defaultValue={book?.publication_date}
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </Form.Group>

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
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Book
        </Button>
      </Form>
    </div>
  );
};

export default EditBook;
