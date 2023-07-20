import App from "../App";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import AddNew from "../pages/AddNew";
import EditBook from "../pages/EditBook";
import BookDetails from "../pages/BookDetails";
import PrivateRoute from "./PrivateRoute";
import WishList from "../pages/WishList";
import Reading from "../pages/Reading";
import ReadedBooks from "../pages/ReadedBooks";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allbooks",
        element: <AllBooks />,
      },
      {
        path: "/addnew",
        element: (
          <PrivateRoute>
            <AddNew />
          </PrivateRoute>
        ),
      },
      {
        path: "/editbook/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/bookdetails/:id",
        element: <BookDetails />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/reading",
        element: (
          <PrivateRoute>
            <Reading />
          </PrivateRoute>
        ),
      },
      {
        path: "/readedBooks",
        element: (
          <PrivateRoute>
            <ReadedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
