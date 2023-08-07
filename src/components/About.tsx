import { Button, Col, Image, Row } from "react-bootstrap";
import model from "../assets/images/model-with-books.jpg";
import { goToTop } from "../utils/customFunction";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <Row className="align-items-center mt-5 mx-2 mx-md-5">
      <Col xs={12} md={6}>
        <div>
          <Image data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000" src={model} alt="" className="rounded-3 img-fluid" height="100%" />
        </div>
      </Col>
      <Col xs={12} md={6} className="pe-5">
        <div className="mt-3 mt-md-1">
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
            Book Wheel has a big catalog of 12 Million books online
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
            data-aos-duration="1500"
            variant="outline-success"
            className="mt-4 py-3 px-4"
            onClick={() => {
              navigate("/allbooks");
              goToTop();
            }}
          >
            Browse Now
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default About;
