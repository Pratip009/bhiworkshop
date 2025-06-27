/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user } = useContext(AuthContext);

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if user doesn't have the required role
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children; // ✅ Use children instead of <Outlet />
};

export default ProtectedRoute;
