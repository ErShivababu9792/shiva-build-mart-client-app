import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const role = String(
    user?.role || user?.userRole || user?.type || ""
  ).toLowerCase();

  if (!token || !user || role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;

};

export default AdminRoute;