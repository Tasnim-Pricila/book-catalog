import App from "../App";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";
import { createBrowserRouter } from 'react-router-dom';
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import AddNew from "../pages/AddNew";
import EditBook from "../pages/EditBook";
import BookDetails from "../pages/BookDetails";

const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/allbooks',
          element: <AllBooks />,
        },
        {
          path: '/addnew',
          element: <AddNew />,
        },
        {
          path: '/editbook/:id',
          element: <EditBook />,
        },
        {
          path: '/bookdetails/:id',
          element: <BookDetails />,
        },
        {
          path: '/signin',
          element: <SignIn />,
        },
        {
          path: '/signup',
          element: <Signup />,
        }
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  
  export default routes;