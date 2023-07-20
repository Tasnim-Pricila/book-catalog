import { ReactNode } from "react";
import { useAppSelector } from "../redux/features/hook";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (!user?.email) {
    return <Navigate to="/signin" state={{ from:location }} replace />;
  }

  return children;
};

export default PrivateRoute;
