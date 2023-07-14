import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const RecentBooks = () => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <div className="d-flex">
          <Card.Img
            variant="top"
            src=""
            alt="fgfgggggg"
            // className="w-50 "
          />
          <Card.Body>
            <Card.Title>Reading on the World</Card.Title>
            <Card.Text>Jhone Steben</Card.Text>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <Card.Text>$100 $89</Card.Text>
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default RecentBooks;
