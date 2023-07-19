import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAppDispatch, useAppSelector } from "../redux/features/hook";
import { logout } from "../redux/features/users/userSlice";

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
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto w-50 d-flex justify-content-end">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 border border-primary"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Nav>
          <Nav className="d-flex justify-content-center align-items-center" style={{gap: 12}}>
            <Link to="/allbooks" className="text-decoration-none">All Books</Link>

            {user.email ? (
              <Button onClick={() => handleLogout()}>Logout</Button>
            ) : (
              <>
                <Link to="/signin" className="text-decoration-none">Sign In</Link>
                <Link to="/signup" className="text-decoration-none">Sign Up</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
