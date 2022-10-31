import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../Store/ConfigureStore";
 
export const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.account);
 
  return !user ? (
    <Navigate replace to={"/login"} state={{ from: location }} />
  ) : (
    <Outlet />
  );
};