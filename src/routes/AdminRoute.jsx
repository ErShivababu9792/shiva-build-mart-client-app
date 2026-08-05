import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  const role = String(
    user?.role || user?.userRole || user?.type || ""
  ).toLowerCase();

  if (!user || role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminRoute;