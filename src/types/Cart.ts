import { IProduct } from "./Product";
export interface ICart {
  id: number;
  userId: number;
  products: IProduct[];
}
