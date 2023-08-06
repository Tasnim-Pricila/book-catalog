/* eslint-disable @typescript-eslint/no-unsafe-call */
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./layout/MainLayout";
import { useAppDispatch } from "./redux/features/hook";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useEffect } from "react";
import { setLoading, setUser } from "./redux/features/users/userSlice";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
AOS.init();

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
      else{
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
