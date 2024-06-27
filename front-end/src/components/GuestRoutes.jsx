import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
  const user = useSelector(state => {
    return state.user.user;
  });

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default GuestRoutes;
