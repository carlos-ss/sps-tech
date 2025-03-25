import { IProduct } from "@/types/Product";
import { Button } from "flowbite-react";
import { useStore } from "@/store";
import { useGet, usePost, usePut } from "@/hooks/request";

import { urls } from "@/api";
import { IError } from "@/types/Request";
import { ICart, IRequestPutCart, IResponseCartProduct } from "@/types/Cart";
import { IToasterProps, IToastType } from "@/types/Toaster";
import Toaster from "../Toaster";
import { useState } from "react";

export interface IAddToCartButtonProps {
  product: IProduct;
}
export const AddToCartButton = ({ product }: IAddToCartButtonProps) => {
  const [toast, setToast] = useState<IToasterProps>({
    message: "",
    type: "none",
  });

  const { user, cart } = useStore();
  const { data: carts } = useGet<IResponseCartProduct[]>(
    "all-carts",
    urls.carts.all
  );

  const existingCartId = cart && cart.id;

  // prepare both types of mutations to follow REST standards
  const updateMutation = usePut<IRequestPutCart[], IError, IRequestPutCart>(
    urls.carts.byId(`${existingCartId}`)
  );
  const postMutation = usePost<ICart[], IError, ICart>(urls.carts.all);

  // request callbacks
  const onSuccess = () => {
    handleToastMessage("Product added to cart", "success");
  };
  const onError = () => {
    handleToastMessage("Failed to add product to cart");
  };

  //generic function to handle toast messages for errors
  const handleToastMessage = (message: string, type: IToastType = "error") => {
    setToast({
      message,
      type,
    });
  };

  const handleAddToCart = () => {
    // will handle post only
    let lastCartid = carts
      ?.map((cart) => cart.id) // get all user ids
      .sort((a, b) => a - b) // sort the ids
      .pop(); // get the last id

    if (lastCartid) {
      const body = {
        id: lastCartid + 1,
        products: [product],
        userId: user.id,
      };

      postMutation.mutate(body, { onSuccess, onError });
    } else {
      handleToastMessage("Cannot create to cart due to missing id");
    }
  };

  const handleUpdateCart = () => {
    // will handle put only
    if (existingCartId) {
      const body = {
        id: existingCartId,
        products: [...cart.products, product],
        userId: 1,
      };

      updateMutation.mutate(body, {
        onSuccess,
        onError,
      });
    } else {
      handleToastMessage("Cannot update cart due to missing");
    }
  };

  return (
    <div
      aria-label="Add to cart button container"
      className="relative flex justify-end"
    >
      <Button
        color="blue"
        onClick={existingCartId ? handleUpdateCart : handleAddToCart}
      >
        Add to cart
      </Button>
      <div className="absolute top-full right-0 mt-2">
        <Toaster {...toast} />
      </div>
    </div>
  );
};
