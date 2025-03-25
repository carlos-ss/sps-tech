import { urls } from "@/api";
import { useGet } from "@/hooks/request";
import { useStore } from "@/store";
import { IProduct } from "@/types/Product";
import { Button } from "flowbite-react";

export const CartPage = () => {
  const { cart } = useStore();

  const { data: products } = useGet<IProduct[]>(
    "all-products",
    urls.products.all
  );

  if (!cart || cart.products.length === 0 || !products) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const cartProducts = cart.products
    .map((cartProduct) => {
      const product = products.find((p) => p.id === cartProduct.productId);
      if (!product) {
        return null;
      }
      return {
        ...product,
        quantity: cartProduct.quantity,
      };
    })
    .filter((product) => product !== null);

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * (product.quantity ?? 1),
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <ul className="mb-4">
        {cartProducts.map((product) => (
          <li
            key={product.id}
            className="mb-2 flex justify-between items-center"
          >
            <div className="flex items-center">
              <img
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
              />
              <div className="ml-6">
                <p className="text-xl font-semibold mb-2">{product.title}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-600">
                  {`Price: $${product.price.toFixed(2)}`}
                </p>
              </div>
            </div>
            <p className="text-xl font-semibold">
              {`$${(product.price * (product.quantity ?? 1)).toFixed(2)}`}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-end mb-4">
        <p className="text-2xl font-bold mb-6">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <Button color="blue">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
