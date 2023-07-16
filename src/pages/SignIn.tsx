import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { faFacebook, faGoogle, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const SignIn = () => {
  return (
    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 bg-warning">
      <div className="row gx-lg-5 align-items-center mb-5">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-5 fw-bold ls-tight">
            The best offer <br />
            <span>for your business</span>
          </h1>
          <p className="mb-4 opacity-70">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Temporibus, expedita iusto veniam atque, magni tempora mollitia
            dolorum consequatur nulla, neque debitis eos reprehenderit quasi ab
            ipsum nisi dolorem modi. Quos?
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div className="card bg-glass">
            <div className="card-body px-4 py-5 px-md-5">
              <Form>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="mb-4"
                />

                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  className="mb-4"
                />

                {/* <!-- Submit Button --> */}
                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>

                {/* <!-- Register Buttons --> */}
                <div className="text-center">
                  <p>or sign up with:</p>
                  <Button className="btn btn-link btn-floating mx-1">
                    <FontAwesomeIcon icon={faFacebook} />
                  </Button>

                  <Button className="btn btn-link btn-floating mx-1">
                    <FontAwesomeIcon icon={faGoogle} />
                  </Button>

                  <Button className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faTwitter} />
                  </Button>

                  <Button className="btn btn-link btn-floating mx-1">
                  <FontAwesomeIcon icon={faInstagram} />
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
