import { IProduct, IResponseProductCart } from "./Product";
export interface ICart {
  id: number;
  userId: number;
  products: IProduct[];
}
export interface IResponseCartProduct extends Omit<ICart, "products"> {
  products: IResponseProductCart[];
}
