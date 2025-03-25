import { IProduct, IResponseProductForCart } from "./Product";
export interface ICart {
  id: number;
  userId: number;
  products: IProduct[];
}

// Response from cart is different than the Iproduct
export interface IResponseCartProduct extends Omit<ICart, "products"> {
  products: IResponseProductForCart[];
}

//Request to put requires both the IProduct and IResponseProductForCart
//FIXME: Needs to be updated in the backend to have a single type
export interface IRequestPutCart extends Omit<ICart, "products"> {
  products: (IResponseProductForCart | IProduct)[];
}
