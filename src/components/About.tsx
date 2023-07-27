import { Button, Col, Container, Image, Row } from "react-bootstrap";
import model from "../assets/images/model-with-books.jpg"
import "./About.css";

const About = () => {
  return (
    <Container className="mb-5">
    <Row className="align-items-center my-5">
      <Col md={6}>
        <div>
            <Image src={model} alt="" className="rounded-3" />
        </div>
      </Col>
      <Col md={6} className="pe-5">
        <div>
          <small
            data-aos="fade-up"
            data-aos-duration="3000"
            className="text-uppercase bg-secondary px-3 py-2 text-white border-none rounded-3 d-inline-block my-1"
          >
            Hundreds of Book Genres
          </small>
          <h1
            data-aos="flip-left"
            data-aos-duration="1500"
            className="mt-2"
            style={{ fontSize: 60 }}
          >
            BookChoix has a big catalog of 12 Million books online
          </h1>
          <p
            data-aos="fade-up"
            data-aos-duration="3000"
            className="h6 pe-5 mt-4"
          >
            Efficiently unleash cross-media information without cross-media
            value. Quickly maximize timely deliverables for real-time schemas.
            Dramatically maintain clicks-and-mortar solutions without functional
            solutions.{" "}
          </p>
          <Button
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            variant="dark"
            className="mt-4 py-3 px-4"
          >
            Browse Now
          </Button>
        </div>
      </Col>
    </Row>
    </Container>
  );
};

export default About;
