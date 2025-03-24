import { urls } from "@/api";

import Toaster from "@/components/Toaster";
import UserForm from "@/components/UserForm";

import { usePost } from "@/hooks/request";

import { Form, ILoginForm } from "@/types/Form";
import { IToasterProps } from "@/types/Toaster";
import { IError, ILoginResponse } from "@/types/Request";

import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<IToasterProps>({
    message: "",
    type: "none",
  });
  const mutation = usePost<ILoginResponse, IError, ILoginForm>(urls.auth);

  const handleDataSubmit = (data: ILoginForm) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        // handle ui success
        Cookies.set("token", data.token, {
          secure: true,
          sameSite: "strict",
        });
        navigate("/buy");
      },
      onError: (error) => {
        // handle ui error
        setToast({ message: error.message, type: "error" });
      },
    });
  };

  return (
    <section className="w-3/4 flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <UserForm onDataSubmit={handleDataSubmit} type="login" />
        <Toaster {...toast} />
      </div>
    </section>
  );
};
