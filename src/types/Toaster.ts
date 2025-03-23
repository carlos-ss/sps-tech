export type IToastType = "success" | "error" | "warning" | "info" | "none";

export interface IToasterProps {
  message: string;
  type: IToastType;
}
