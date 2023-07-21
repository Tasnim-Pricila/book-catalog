import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import { logout } from "../redux/features/users/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faCircleCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary px-5">
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none">Book Zone</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto w-50 d-flex justify-content-end">
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 border border-primary"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form> */}
          </Nav>
          <Nav
            className="d-flex justify-content-center align-items-center"
            style={{ gap: 12 }}
          >
            {user.email && (
              <Stack direction="horizontal" gap={3} className="me-5">
                <Link to="/wishlist">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>My Wishlist</Tooltip>
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-danger"
                    ></FontAwesomeIcon>
                  </OverlayTrigger>
                </Link>
                <Link to="/reading">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Reading Now</Tooltip>
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faBookOpenReader}
                      className="text-primary"
                    ></FontAwesomeIcon>
                  </OverlayTrigger>
                </Link>
                <Link to="/readedBooks">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Already Read</Tooltip>
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-success"
                    ></FontAwesomeIcon>
                  </OverlayTrigger>
                </Link>
              </Stack>
            )}
            <Link to="/allbooks" className="text-decoration-none">
              All Books
            </Link>

            {user.email ? (
              <>
                <Link to="/addnew" className="text-decoration-none">
                  Add New
                </Link>
                <Button onClick={() => handleLogout()}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-decoration-none">
                  Sign In
                </Link>
                <Link to="/signup" className="text-decoration-none">
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
