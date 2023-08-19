/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import {
  getDownloadURL,
  ref,
  // uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../lib/firebase";
import Loading from "../shared/Loading";

const AddNew = () => {
  const navigate = useNavigate();
  const [createBook, { isSuccess, isError, error }] = useCreateBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [file, setFile] = useState<File | null>(null);
  const [myImage, setImage] = useState<File | null>(null);
  const [imagePreview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

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

  const getFile = (e: React.FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      setFile(selectedFile);
    }
  };

  const getImage = (e: React.FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      setImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      title: { value: string };
      author: { value: string };
      genre: { value: string };
      publication_date: { value: string };
      price: { value: number };
    };

    if (!file || !myImage) return;
    if (myImage && file) {
      const imageUploadName = myImage.name + Date.now();
      const imageStorageRef = ref(storage, `/images/${imageUploadName}`);
      const imageUploadTask = uploadBytesResumable(imageStorageRef, myImage);

      const fileUploadName = file.name + Date.now();
      const fileStorageRef = ref(storage, `/files/${fileUploadName}`);
      const fileUploadTask = uploadBytesResumable(fileStorageRef, file);

      // Function to track progress
      // const trackProgress = (snapshot) => {
      //   const progress = Math.round(
      //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //   );
      //   console.log("Upload progress:", progress, "%");
      //   setProgress(progress);
      // };

      // imageUploadTask.on("state_changed", trackProgress, (error) => {
      //   console.error("Image upload error:", error);
      // });

      // fileUploadTask.on("state_changed", trackProgress, (error) => {
      //   console.error("File upload error:", error);
      // });

      Promise.all([imageUploadTask, fileUploadTask])
        .then(async () => {
          const imageUrl = await getDownloadURL(imageUploadTask.snapshot.ref);
          const pdfFileUrl = await getDownloadURL(fileUploadTask.snapshot.ref);
          // console.log("Image URL:", imageUrl);
          // console.log("PDF File URL:", pdfFileUrl);
          const data: IBook = {
            title: target.title.value,
            author: target.author.value,
            genre: target.genre.value,
            publication_date: target.publication_date.value,
            price: target.price.value,
            image: imageUrl,
            createdBy: user.email!,
            pdfFileUrl: pdfFileUrl,
          };
          createBook(data)
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error uploading files:", error);
        });
    }
  };
  if (loading) {
    return <Loading />;
  }
  const errorMessage = (error as IError)?.data?.message;

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
              <Form.Label className="fw-bold">Upload Image</Form.Label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="form-control"
                onChange={getImage}
                placeholder="Choose Image"
                required
              />
              <img
                src={imagePreview ? imagePreview : ""}
                width="auto"
                height="80"
                className="mt-2"
                style={{ display: imagePreview ? "block" : "none" }}
              />
            </Form.Group>
            <Form.Label className="fw-bold">Upload Pdf</Form.Label>
            <input
              type="file"
              name="files"
              accept="application/pdf"
              className="form-control"
              onChange={getFile}
              required
            />
            
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
