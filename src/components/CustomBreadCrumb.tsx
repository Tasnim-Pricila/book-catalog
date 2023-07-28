import { Breadcrumb, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomBreadCrumb = () => {
  return (
    <Stack className="bread-bg">
      <Breadcrumb className="bread-overlay border border-danger d-flex align-items-center  justify-content-center">
        <Breadcrumb.Item className="text-decoration-none">
          <Link to="/">Home </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/allbooks">All Books </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add New</Breadcrumb.Item>
      </Breadcrumb>
    </Stack>
  );
};

export default CustomBreadCrumb;
