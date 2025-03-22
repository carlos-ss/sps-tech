import { Navigate } from "react-router";

const RouteProtect = ({ children }: { children: React.ReactElement }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RouteProtect;
