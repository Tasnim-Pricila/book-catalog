import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto w-50 d-flex justify-content-end">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 border border-primary"
                  aria-label="Search"
                />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Nav>
            <Nav
              className=""
              // className='d-flex justify-content-end w-100'
            >
              <Nav.Link href="#deets">All Books</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Sign In
              </Nav.Link>
              <Nav.Link eventKey={3} href="#memes">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
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
      </Container>
    </>
  );
}

export default App;
