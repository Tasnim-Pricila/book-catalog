import { Col, Container, Image, Row } from "react-bootstrap";
import notfound from "../../src/assets/images/notfound.jpg";
import Header from "../layout/Header";

const NotFound = () => {
  return (
    <>
      <Header></Header>
      <Container className="my-5 text-center">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Image src={notfound} className="img-fluid" />
            <h1 className="mt-3">Oops! Page Not Found</h1>
            <p className="text-muted">
              The page you're looking for does not exist.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
