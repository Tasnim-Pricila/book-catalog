import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <Container>
      <Header></Header>
      <div className="my-5">
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default MainLayout;
