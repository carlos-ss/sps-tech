import { urls } from "@/api";

import Toaster from "@/components/Toaster";
import UserForm from "@/components/UserForm";

import { useGet, usePost } from "@/hooks/request";

import { IUser } from "@/types/Users";
import { IError } from "@/types/Request";
import { IRegisterForm } from "@/types/Form";
import { IToasterProps } from "@/types/Toaster";

import { useState } from "react";

export const RegisterPage = () => {
  const [toast, setToast] = useState<IToasterProps>({
    message: "",
    type: "none",
  });
  const { data: userData } = useGet<IUser[]>("users-all", urls.users.all);
  const mutate = usePost<IUser, IError, IRegisterForm>(urls.users.all);

  const handleDataSubmit = (formData: IRegisterForm) => {
    let lastId = userData
      ?.map((user) => user.id) // get all user ids
      .sort((a, b) => a - b) // sort the ids
      .pop(); // get the last id

    if (lastId) {
      formData.id = lastId + 1;
      mutate.mutate(formData, {
        onSuccess: (data) => {
          // handle ui success
          setToast({
            message: "User created successfully; New ID: " + data.id,
            type: "success",
          });
        },
        onError: (error) => {
          // handle ui error
          setToast({ message: "Failed to create User", type: "error" });
        },
      });
    }
  };
  return (
    <section className="w-3/4 flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <UserForm onDataSubmit={handleDataSubmit} type="register" />
        <Toaster {...toast} />
      </div>
    </section>
  );
};
