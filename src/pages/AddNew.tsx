import { Button, Form } from "react-bootstrap";
import { genres } from "../utils/constants";

const AddNew = () => {
  return (
    <div>
      <Form>
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
          <Form.Control
            as="select"
            name="genre"
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
            required
          />
        </Form.Group>

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

export default AddNew;
