import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NoAuthRoutes = () => {
  const user = useSelector(state => {
    return state.user.user;
  });

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default NoAuthRoutes;
