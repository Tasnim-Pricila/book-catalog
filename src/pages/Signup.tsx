import {
  faFacebook,
  faGoogle,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import { createUser, errorHandle } from "../redux/features/users/userSlice";
import { useState, useEffect, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../redux/features/users/userApi";
import ToastMessage from "../shared/ToastMessage";
import Loading from "../shared/Loading";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSuccess, isLoading, isError, error } = useAppSelector(
    (state) => state.user
  );
  const [createUserApi] = useCreateUserMutation();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
      password: { value: string };
    };
    const data = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      email: target.email.value,
      password: target.password.value,
    };

    dispatch(createUser({ email: data.email, password: data.password }))
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
    if (isSuccess) {
      handleShow();
      setTimeout(() => {
        dispatch(errorHandle());
      }, 3000);
      createUserApi(userInfo)
        .then(() => {
          // Do something after successful login
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (user.email && !isLoading) {
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    }
    if (isError) {
      handleShow();
      setTimeout(() => {
        dispatch(errorHandle());
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, user?.email, isLoading, isError, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ToastMessage
        show={show}
        handleClose={handleClose}
        message={isSuccess ? "Registration Successful" : error!}
        variant={isSuccess ? "success" : "danger"}
      />
      <div className="px-4 py-5 px-md-5 text-center text-lg-start my-5 bg-warning mx-md-5 mx-1">
        <Row className="gx-lg-5 align-items-center mb-5">
          <Col className="mb-5 mb-lg-0" lg={6}>
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
              <Card.Body className="px-2 py-5 px-md-5">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-4">
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col md={6} className="mb-4">
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, lastName: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    className="mb-4"
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="mb-4"
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                  />

                  {/* <!-- Submit button --> */}
                  <Button variant="primary" type="submit" className="w-100">
                    Sign up
                  </Button>
                  <p>
                    Already have an account?
                    <Link to="/signin" className="text-decoration-none"> Login</Link>
                  </p>

                  {/* <!-- Register buttons --> */}
                  <div className="text-center">
                    <p className="mt-2 fw-bold">or sign up with:</p>
                    <Button className="btn btn-link mx-1">
                      <FontAwesomeIcon icon={faFacebook} />
                    </Button>

                    <Button className="btn btn-link mx-1">
                      <FontAwesomeIcon icon={faGoogle} />
                    </Button>

                    <Button className="btn btn-link mx-1">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button>

                    <Button className="btn btn-link mx-1">
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

export default Signup;
