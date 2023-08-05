import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Stack } from "react-bootstrap";
import { faDribbble, faFacebook, faGoogle, faInstagram, faSkype, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="text-center text-lg-start bg-black text-white">
        <section className="d-flex flex-column flex-md-row justify-content-between  align-items-center p-4 bg-success px-5" style={{gap: 12}}>
          <div>
            <span>Get connected with us on social networks:</span>
          </div>

          <Stack direction="horizontal" gap={4} className="mx-auto mx-md-0">
              <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faSkype}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faDribbble}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </Stack>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <Row className="mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Book Wheel</h6>
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
                    Books
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white text-decoration-none">
                  Books
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white text-decoration-none">
                  Books
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white text-decoration-none">
                  Books
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
            </Row>
          </div>
        </section>

        <div className="text-center p-3">
          © 2023 Copyright: {" "}
          <Link className="text-white text-decoration-none" to="/">
            bookwheel.com
          </Link>
        </div>
      </div>
    );
};

export default Footer;