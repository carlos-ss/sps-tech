import { Navigate } from "react-router";
import { userStore } from "@/store";
import { useEffect } from "react";

const RouteProtect = ({ children }: { children: React.ReactElement }) => {
  const token = localStorage.getItem("token");

  const setLoggedIn = userStore((state) => state.setLoggedIn);

  useEffect(() => {
    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RouteProtect;
