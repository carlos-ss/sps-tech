import { createBrowserRouter, Outlet } from "react-router";
import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    element: (
      <div className="m-8">
        layout
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "",
        element: <div className="bg-blue-50">home</div>,
      },

      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
  {
    path: "/public",
    element: <div>public</div>,
  },
  {
    path: "/login",
    element: <div>login</div>,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
export default router;
