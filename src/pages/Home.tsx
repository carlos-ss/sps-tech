import { urls } from "@/api";
import { useGet } from "@/hooks/request";
import { useStore } from "@/store";
import { IResponseCartProduct } from "@/types/Cart";
import { Button } from "flowbite-react";
import { useEffect } from "react";

export const HomePage = () => {
  const { data: carts } = useGet<IResponseCartProduct[]>(
    "all-carts",
    urls.carts.all
  );
  const { user, setCart } = useStore();

  const userCart = carts?.find((cart) => cart.userId === user.id);

  useEffect(() => {
    if (userCart) {
      setCart(userCart);
    }
  }, [carts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      {userCart ? (
        <div className=" p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Welcome back, {user.username}!
          </h2>
          <p className="mb-4">
            You have an existing cart. Continue shopping to add more items to
            your cart.
          </p>
          <Button href="/buy/products" color="blue">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className=" p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {user.username}!
          </h2>
          <p className="mb-4">Start shopping to create your first cart.</p>
          <Button href="/buy/products" color="blue">
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};
