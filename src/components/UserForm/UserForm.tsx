import { Form, IFormProps } from "@/types/Form";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useForm } from "react-hook-form";

export const UserForm = ({ onDataSubmit, type }: IFormProps) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Form>();

  const onSubmit = (data: Form) => onDataSubmit(data);

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* UserName */}
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="username"
            value="User Name"
            color={errors.username && "failure"}
            aria-label="User name label"
          />
        </div>
        <TextInput
          id="username"
          placeholder="User Name"
          aria-label="User name input"
          {...register("username", { required: true })}
          color={errors.username && "failure"}
          helperText={errors.username && "User name  is required"}
        />
      </div>

      {/* Email */}
      <>
        {type === "register" && (
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="User Email"
                color={errors.email && "failure"}
                aria-label="Email label"
              />
            </div>
            <TextInput
              id="email"
              placeholder="User Email"
              aria-label="Email input"
              {...register("email", { required: true })}
              color={errors.email && "failure"}
              helperText={errors.email && "Email is required"}
            />
          </div>
        )}
      </>

      {/* Password */}
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="User password"
            color={errors.password && "failure"}
            aria-label="Password label"
          />
        </div>
        <TextInput
          id="password"
          type="password"
          aria-label="Password input"
          {...register("password", { required: true })}
          color={errors.password && "failure"}
          helperText={errors.password && "Password is required"}
        />
      </div>

      {/* Remember me */}
      {type === "login" && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            aria-label="Remember-me checkbox"
            {...register("remember")}
          />
          <Label htmlFor="remember">Remember me?</Label>
        </div>
      )}

      {/* Submit */}
      <Button type="submit">Submit</Button>
    </form>
  );
};
