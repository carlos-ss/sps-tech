import { createBrowserRouter } from "react-router";
import RouteProtect from "./RouteProtect";
import Layout from "@/components/Layout";

const router = createBrowserRouter([
  {
    path: "buy",
    element: (
      <RouteProtect>
        <Layout />
      </RouteProtect>
    ),
    children: [
      {
        index: true,
        element: <div className="bg-blue-50"> protected home</div>,
      },

      {
        path: "*",
        element: <div> protected 404</div>,
      },
    ],
  },
  {
    element: <Layout />,
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
