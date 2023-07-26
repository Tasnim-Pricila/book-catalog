import { ReactNode } from "react";
import { useAppSelector } from "../redux/features/hook";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../shared/Loading";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return <Loading/>
  }
  
  if (!user?.email) {
    return <Navigate to="/signin" state={{ from:location }} replace />;
  }

  return children;
};

export default PrivateRoute;
