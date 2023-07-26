import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./layout/MainLayout";
import { useAppDispatch } from "./redux/features/hook";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useEffect } from "react";
import { setLoading, setUser } from "./redux/features/users/userSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } 
    });
  }, [dispatch]);

  return (
    <>
      <MainLayout />
      <ToastContainer/>
    </>
  );
}

export default App;
