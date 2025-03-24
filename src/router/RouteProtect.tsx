import { Navigate } from "react-router";
import { useStore } from "@/store";
import { useEffect } from "react";
import Cookies from "js-cookie";

const RouteProtect = ({ children }: { children: React.ReactElement }) => {
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const token = Cookies.get("token");

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
