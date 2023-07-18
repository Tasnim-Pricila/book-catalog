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
  const { user, isLoading } = useAppSelector((state) => state.user);
  console.log(user);
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
          <Nav
            className=""
            // className='d-flex justify-content-end w-100'
          >
            <Link to="/allbooks">All Books</Link>

            {user.email ? (
              <Button onClick={() => handleLogout()}>Logout</Button>
            ) : (
              <>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
