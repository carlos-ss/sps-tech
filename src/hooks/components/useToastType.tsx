import { IToastType } from "@/types/Toaster";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXCircle,
} from "react-icons/hi";

export const useToastType = (type: IToastType) => {
  switch (type) {
    case "error":
      return (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiXCircle aria-label="error-x" className="h-5 w-5" />
        </div>
      );
    case "success":
      return (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheckCircle aria-label="success-check" className="h-5 w-5" />
        </div>
      );
    case "warning":
      return (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200">
          <HiExclamationCircle
            aria-label="warning-exclamation"
            className="h-5 w-5"
          />
        </div>
      );
    case "info":
      return (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
          <HiInformationCircle aria-label="info-i" className="h-5 w-5" />
        </div>
      );
    default:
      return null;
  }
};
