import { Breadcrumb, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import './CustomBreadCrumb.css';

interface IProps {
  Menu1: string;
  Menu2?: string;
  Menu3?: string;
  activeMenu: string;
}

const CustomBreadCrumb = ({ Menu1, Menu2, Menu3, activeMenu }: IProps) => {
  return (
    <Stack className="bread-bg">
      <Breadcrumb className="bread-overlay border border-danger d-flex align-items-center  justify-content-center">
        <Breadcrumb.Item className="text-decoration-none">
          <Link to="/">{Menu1} </Link>
        </Breadcrumb.Item>
        {Menu2 && (
          <Breadcrumb.Item>
            <Link to="/allbooks">{Menu2} </Link>
          </Breadcrumb.Item>
        )}
        {Menu3 && (
          <Breadcrumb.Item>
            <Link to="/allbooks">{Menu3} </Link>
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item active>{activeMenu}</Breadcrumb.Item>
      </Breadcrumb>
    </Stack>
  );
};

export default CustomBreadCrumb;
