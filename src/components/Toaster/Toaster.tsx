import { useToastType } from "@/hooks/components";
import { IToasterProps } from "@/types/Toaster";
import { Toast } from "flowbite-react";

export const Toaster = ({ message, type }: IToasterProps) => {
  const ToastIcon = useToastType(type);
  if (type === "none") return null;
  return (
    <Toast>
      {ToastIcon}
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};
