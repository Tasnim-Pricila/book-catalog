import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation } from "../redux/features/books/bookApi";
import { Button, Modal } from "react-bootstrap";
import ToastMessage from "../shared/ToastMessage";
import { IError } from "../types/globalTypes";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  id: string;
}

const DeleteBookModal = ({ id }: IProps) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleModalShow = () => setModal(true);
  const handleModalClose = () => setModal(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [deleteBook, { isSuccess, isError, error }] = useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(id)
      .then(() => {
        // console.log('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      handleShow();
      setModal(false);
      setTimeout(() => {
        navigate("/allbooks");
      }, 1500);
    }
    if (isError) {
      handleShow();
      setModal(false);
    }
  }, [isSuccess, isError, navigate]);

  const errorMessage = (error as IError)?.error as string;

  return (
    <>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Book deleted successfully" : errorMessage}
        variant={isSuccess ? "success" : "danger"}
      />

      <Button variant="danger" onClick={handleModalShow}>
        <FontAwesomeIcon icon={faTrash} className="me-1"></FontAwesomeIcon>{" "}
        Delete Book
      </Button>
      <Modal show={modal} centered onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleDelete()}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBookModal;
