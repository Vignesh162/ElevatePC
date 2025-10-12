// components/RouteGroup.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const RouteGroup = ({ children, allowedRoles = ["user", "admin"] }) => {
  const { user, token } = useContext(AuthContext);
  const location = useLocation();

  const isAuthenticated = !!(user && token);
  const hasAllowedRole = allowedRoles.includes(user?.role);

  if (!isAuthenticated) {
    alert("🔐 Please login to access this page");
    return (
      <Navigate 
        to="/LoginPage" 
        state={{ from: location.pathname + location.search }} 
        replace 
      />
    );
  }

  if (!hasAllowedRole) {
    alert("🚫 You don't have permission to access these pages");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteGroup;