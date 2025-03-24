import { createBrowserRouter } from "react-router";
import RouteProtect from "./RouteProtect";
import Layout from "@/components/Layout";
import {
  LoginPage,
  ProductsPage,
  RegisterPage,
  HomePage,
  ProductDetailPage,
} from "@/pages";

const router = createBrowserRouter([
  {
    path: "/buy",
    element: (
      <RouteProtect>
        <Layout />
      </RouteProtect>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/buy/products",
        element: <ProductsPage />,
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
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);
export default router;
