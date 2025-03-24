import { Navigate } from "react-router";
import Cookies from "js-cookie";

const UserValidator = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/buy" />;
  }

  return children;
};

export default UserValidator;
