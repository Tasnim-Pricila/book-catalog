import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { errorHandle, loginUser } from "../redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import ToastMessage from "../shared/ToastMessage";
import Loading from "../shared/Loading";

const SignIn = () => {
  const { user, isLoading, isError, error, isSuccess } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const data = {
      email: target.email.value,
      password: target.password.value,
    };

    dispatch(loginUser({ email: data.email, password: data.password }))
      .then(() => {
        // Do something after successful login
      })
      .catch((error) => {
        console.log(error);
      });
  };
  type LocationState = {
    from: {
      pathname: string;
    };
  };
  const from: string = (location.state as LocationState)?.from?.pathname || "/";

  useEffect(() => {
    if (isSuccess || isError) {
      handleShow();
      setTimeout(() => {
        dispatch(errorHandle())
      }, 3000);
    }
    if (user?.email && !isLoading) {
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    }
  }, [user?.email, from, isLoading, navigate, isSuccess, isError, dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Login Successful" : error!}
        variant={isSuccess ? "success" : "danger"}
      />
      <div className="py-5 px-md-5 text-center text-lg-start my-5 bg-warning mx-5">
        <Row className="gx-lg-5 align-items-center mb-5">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="my-5 display-5 fw-bold ls-tight">
              The best offer <br />
              <span>for your business</span>
            </h1>
            <p className="mb-4 opacity-70">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Temporibus, expedita iusto veniam atque, magni tempora mollitia
              dolorum consequatur nulla, neque debitis eos reprehenderit quasi
              ab ipsum nisi dolorem modi. Quos?
            </p>
          </Col>

          <Col lg={6} className="mb-5 mb-lg-0 position-relative">
            <Card className="bg-glass">
              <Card.Body className="px-4 py-5 px-md-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="mb-4"
                    required
                  />

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="mb-4"
                    required
                  />

                  {/* <!-- Submit Button --> */}
                  <Button variant="primary" type="submit" className="w-100">
                    Sign In
                  </Button>
                  <p>
                    Not registered yet? 
                    <Link to="/signup" className="text-decoration-none"> Signup</Link>
                  </p>

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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignIn;
