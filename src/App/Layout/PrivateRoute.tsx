import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../Store/ConfigureStore";


interface Props extends RouteProps {
  roles?: string[];
}

export const PrivateRoute = ({ roles }: Props) => {

  const location = useLocation();
  const { user } = useAppSelector((state) => state.account);


  if (!user) {
    return <Navigate replace to={"/login"} state={{ from: location }} />
  }
  else if (roles && !roles?.some(r => user.roles?.includes(r))) {
    toast.error("Not Authorize to access this");
    return <Navigate replace to={"/catalog"} />
  }
  else {
    return <Outlet />
  }


  // !user ? (
  //   <Navigate replace to={"/login"} state={{ from: location }} />
  // ) : (
  //   <Outlet />
  // );
};