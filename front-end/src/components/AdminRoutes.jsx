import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const user = useSelector(state => {
    return state.user.user;
  });

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
