import { createBrowserRouter, Outlet } from "react-router";
import Test from "../pages/Test";
import RouteProtect from "./RouteProtect";

const router = createBrowserRouter([
  {
    path: "buy",
    element: (
      <RouteProtect>
        <div className="m-8">
          layout
          <Outlet />
        </div>
      </RouteProtect>
    ),
    children: [
      {
        index: true,
        element: <div className="bg-blue-50"> protected home</div>,
      },

      {
        path: "test",
        element: <Test />,
      },
      {
        path: "*",
        element: <div> protected 404</div>,
      },
    ],
  },
  {
    element: (
      <div>
        public layout <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <div>public stuf</div>,
      },
      {
        path: "login",
        element: <div>login</div>,
      },
      {
        path: "register",
        element: <div>register</div>,
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);
export default router;
