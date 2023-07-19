import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
        <Header></Header>
        <div className="my-5 px-5">
          <Outlet />
        </div>
      <Footer />
    </>
  );
};

export default MainLayout;
