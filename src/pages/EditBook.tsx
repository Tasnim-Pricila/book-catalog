import { useParams } from "react-router-dom";
import { genres } from "../utils/constants";
import { Button, Form } from "react-bootstrap";
import { useGetBookByIdQuery } from "../redux/api/apiSlice";

const EditBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, error } = useGetBookByIdQuery(id);
  const book = bookData?.data;
  return (
    <div>
      <h1 className="mb-4">Edit Book</h1>
      <Form>
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
            value={book?.genre}
            onChange={(e) => console.log(e.target.value)}
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
            type="text"
            name="publicationDate"
            placeholder="Enter publication date"
            defaultValue={book?.publication_date}
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
          Add Book
        </Button>
      </Form>
    </div>
  );
};

export default EditBook;
