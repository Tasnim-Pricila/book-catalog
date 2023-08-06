import { Col, Row } from "react-bootstrap";
import CustomHeading from "../shared/CustomHeading";
import "./BrowseCategories.css";
import { useAppDispatch } from "../redux/features/hook";
import { setGenre } from "../redux/features/books/bookSlice";
import { useNavigate } from "react-router-dom";

const BrowseCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = (value: string) => {
    navigate("/allbooks");
    dispatch(setGenre(value));
  };
  return (
    <>
      <CustomHeading
        smallTitle="Collections"
        headTitle="Browse Categories"
        paragraph="Reading books keeps you relax and helps
        reduce stress"
      />
      <Row className="justify-content-center mx-md-5 mx-1 mb-5">
        <Col lg={3} className="pe-5">
          <Row
            className="hover-col first-col mb-4"
            onClick={() => handleClick("Fiction")}
          >
            <Col xs={12}>
              <div className="category-text mx-3 px-3 py-2 rounded-3">
                <p className="mb-2 ">Fiction</p>
                <p className="ps-3 mb-0 second-line"> - Browse Books</p>
              </div>
            </Col>
          </Row>
          <Row
            className="hover-col fourth-col mb-4 mb-lg-0"
            onClick={() => handleClick("Music")}
          >
            <Col xs={12}>
              <div className="category-text mx-3 px-3 py-2 rounded-3">
                <p className="mb-2 ">Music</p>
                <p className="ps-3 mb-0 second-line"> - Browse Books</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3}>
          <Row
            className="hover-col second-col mb-4"
            onClick={() => handleClick("Cooking")}
          >
            <Col xs={12}>
              <div className="category-text mx-3 px-3 py-2 rounded-3">
                <p className="mb-2 ">Cooking</p>
                <p className="ps-3 mb-0 second-line"> - Browse Books</p>
              </div>
            </Col>
          </Row>
          <Row
            className="hover-col fifth-col mb-4 mb-lg-0"
            onClick={() => handleClick("Historical Fiction")}
          >
            <Col xs={12}>
              <div className="category-text mx-3 px-3 py-2 rounded-3">
                <p className="mb-2 ">History</p>
                <p className="ps-3 mb-0 second-line"> - Browse Books</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={6} className=" ps-0 ps-lg-5">
          <Row
            className="hover-col third-col"
            onClick={() => handleClick("Fantasy")}
          >
            <Row>
              <Col xs={12}></Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="category-text mx-3 px-3 py-2 rounded-3">
                  <p className="mb-2 ">Fantasy</p>
                  <p className="ps-3 mb-0 second-line"> - Browse Books</p>
                </div>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BrowseCategories;
