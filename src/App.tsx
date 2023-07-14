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

        <div className="text-center text-lg-start bg-black text-white">
          <section className="d-flex justify-content-between p-4 bg-success">
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Company name</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                  <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Products</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      MDBootstrap
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      MDWordPress
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      BrandFlow
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Bootstrap Angular
                    </a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Your Account
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Become an Affiliate
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Shipping Rates
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Help
                    </a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                  <p>
                    <i className="fas fa-home mr-3"></i> New York, NY 10012, US
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3"></i> info@example.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                  </p>
                  <p>
                    <i className="fas fa-print mr-3"></i> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center p-3">
            © 2020 Copyright:
            <a className="text-white text-decoration-none" href="https://mdbootstrap.com/">
              MDBootstrap.com
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
