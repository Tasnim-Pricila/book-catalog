import { Button, Carousel, Col, Row } from "react-bootstrap";
import banner1 from "../../src/assets/images/reading-books.png";
import banner2 from "../../src/assets/images/girl-reading-books-online.png";
import banner3 from "../../src/assets/images/girl-searching-online.png";

const Banner = () => {
  return (
    <div>
      <Carousel
        data-bs-theme="dark"
        touch={true}
        controls={false}
        pause={false}
        style={{ minHeight: "80vh" }}
        className="px-2 px-md-5"
      >
        <Carousel.Item>
          {/* <Container> */}
            <Row className="align-items-center mt-5">
              <Col xs={12} md={6} className="pe-5">
                <div>
                  <small
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    className="text-uppercase bg-secondary px-3 py-2 text-white border-none rounded-3 d-inline-block my-1"
                  >
                    search books easily
                  </small>
                  <h1
                    data-aos="flip-left"
                    data-aos-duration="1500"
                    className="mt-2"
                    style={{ fontSize: 60 }}
                  >
                    Read <span className="text-success">PDF Books </span> Online
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    className="h5 pe-5 mt-4"
                  >
                    Let your customer read books online without leaving <br />{" "}
                    your website
                  </p>
                  <Button
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    variant="success"
                    className="mt-4 py-3 px-4"
                  >
                    Explore Now
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={6} className="d-md-inline-block">
                <div>
                  <img
                    data-aos="fade-up-left"
                    data-aos-duration="1500"
                    src={banner1}
                    alt="Banner Image"
                    className="img-fluid"
                    width="1000"
                    height="1000"
                  />
                </div>
              </Col>
            </Row>
          {/* </Container> */}
        </Carousel.Item>
        <Carousel.Item id="parent">
          {/* <Container className="mb-5"> */}
            <Row className="align-items-center mt-5">
              <Col xs={12} md={6} className="pe-5">
                <div>
                  <small
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    data-aos-anchor="#parent"
                    className="small-title text-uppercase bg-secondary px-3 py-2 d-inline-block my-1 text-white border-none rounded-3"
                  >
                    largest catalog
                  </small>
                  <h1
                    data-aos="flip-left"
                    data-aos-duration="1500"
                    className="mt-2"
                    style={{ fontSize: 60 }}
                  >
                    Over <span className="text-success">12 Million </span>{" "}
                    <br />
                    Books
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    className="h5 pe-5 mt-4"
                  >
                    Start your learning journey by browsing Million of books
                    from our library
                  </p>
                  <Button
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    variant="success"
                    className="mt-4 py-3 px-4"
                  >
                    Explore Now
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={6} className="d-md-inline-block">
                <div>
                  <img
                    src={banner2}
                    alt="Banner Image"
                    className="img-fluid"
                    width="1000"
                    height="1000"
                  />
                </div>
              </Col>
            </Row>
          {/* </Container> */}
        </Carousel.Item>
        <Carousel.Item>
          {/* <Container className="mb-5"> */}
            <Row className="align-items-center mt-5">
              <Col xs={12} md={6} className="pe-5">
                <div>
                  <small
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    className="text-uppercase bg-secondary px-3 py-2 text-white border-none rounded-3 d-inline-block my-1"
                  >
                    search books easily
                  </small>
                  <h1
                    data-aos="flip-left"
                    data-aos-duration="1500"
                    className="mt-2"
                    style={{ fontSize: 60 }}
                  >
                    Use Our <span className="text-success">Search</span> <br />{" "}
                    Feature
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    className="h5 pe-5 mt-4"
                  >
                    Search books using Author names and Genre and save your time
                  </p>
                  <Button
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    variant="success"
                    className="mt-4 py-3 px-4"
                  >
                    Explore Now
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={6} className="d-md-inline-block">
                <div>
                  <img
                    src={banner3}
                    alt="Banner Image"
                    className="img-fluid"
                    width="1000"
                    height="1000"
                  />
                </div>
              </Col>
            </Row>
          {/* </Container> */}
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
