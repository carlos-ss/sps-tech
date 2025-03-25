import { createBrowserRouter } from "react-router";
import RouteProtect from "./RouteProtect";
import Layout from "@/components/Layout";
import {
  LoginPage,
  ProductsPage,
  RegisterPage,
  HomePage,
  ProductDetailPage,
  CartPage,
} from "@/pages";
import UserValidator from "./UserValidator";

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
        path: "/buy/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/buy/cart",
        element: <CartPage />,
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
        element: <div>public stuff</div>,
      },
      {
        path: "/login",
        element: (
          <UserValidator>
            <LoginPage />
          </UserValidator>
        ),
      },
      {
        path: "/register",
        element: (
          <UserValidator>
            <RegisterPage />
          </UserValidator>
        ),
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);
export default router;
