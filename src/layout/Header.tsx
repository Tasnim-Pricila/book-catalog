import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import { logout } from "../redux/features/users/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBookOpenReader,
  faCircleCheck,
  faHeart,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { goToTop } from "../utils/customFunction";

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
      <Navbar
        collapseOnSelect
        expand="lg"
        className="px-2 px-md-5"
        bg="dark" data-bs-theme="dark"
        sticky="top"
        style={{ height: "10vh"}}
      >
        <Navbar.Brand>
          <Link to="/" onClick={goToTop} className="text-decoration-none text-info fw-bold">
            <FontAwesomeIcon icon={faBookOpen }></FontAwesomeIcon> Book Wheel
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav bg-xs-dark">
          <Nav className="me-auto"></Nav>
          <Nav
            className="d-flex justify-content-center align-items-center bg-dark"
            style={{ gap: 12 }}
          >
            {user.email && (
              <Stack direction="horizontal" gap={3} className="me-5 d-flex align-items-center justify-content-center ps-5 ps-md-0">
                <Link to="/wishlist" onClick={goToTop}>
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
                <Link to="/reading" onClick={goToTop}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Reading Now</Tooltip>
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faBookOpenReader}
                      className="text-info"
                    ></FontAwesomeIcon>
                  </OverlayTrigger>
                </Link>
                <Link to="/readedBooks" onClick={goToTop}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Already Read</Tooltip>
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "#16c116" }}
                    ></FontAwesomeIcon>
                  </OverlayTrigger>
                </Link>
              </Stack>
            )}

            <NavLink
              to="/allbooks"
              className={({ isActive }) =>
                isActive
                  ? "text-info text-decoration-none"
                  : "text-decoration-none text-white"
              }
              onClick={goToTop}
            >
              All Books
            </NavLink>

            {user.email ? (
              <>
                <NavLink
                  to="/addnew"
                  onClick={goToTop}
                  className={({ isActive }) =>
                    isActive
                      ? "text-info text-decoration-none"
                      : "text-decoration-none text-white"
                  }
                >
                  Add New
                </NavLink>
                <Button
                  onClick={() => handleLogout()}
                  variant="danger"
                  className="fw-bold"
                >
                  <FontAwesomeIcon
                    icon={faSignOut}
                    className="me-2"
                  ></FontAwesomeIcon>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  onClick={goToTop}
                  className={({ isActive }) =>
                    isActive
                      ? "text-info text-decoration-none"
                      : "text-decoration-none text-white"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={goToTop}
                  className={({ isActive }) =>
                    isActive
                      ? "text-info text-decoration-none pb-2 pb-lg-0"
                      : "text-decoration-none text-white pb-2 pb-lg-0"
                  }
                >
                  Signup
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
