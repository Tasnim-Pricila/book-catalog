import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast, ToastContainer } from "react-bootstrap";

interface IProps {
  show: boolean;
  handleClose: (e?: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | undefined) => void;
  message: string;
  variant: string
}

const ToastMessage = ({ show, handleClose, message, variant }: IProps) => {

  return (
    <ToastContainer position="top-end" className="mt-5 me-5">
      <Toast
        onClose={handleClose}
        show={show}
        bg={variant}
        autohide={true}
        delay={3000}
        className="d-flex align-items-center justify-content-between"
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="text-white me-3"
          onClick={handleClose}
        ></FontAwesomeIcon>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
