import App from "../App";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";
import { createBrowserRouter } from 'react-router-dom';
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

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