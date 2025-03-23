import { Form, IFormProps } from "@/types/Form";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useForm } from "react-hook-form";

export const UserForm = ({ onDataSubmit }: IFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = (data: Form) => {
    console.log(data);
    onDataSubmit(data);
  };
  watch("username");
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="User Email"
            color={errors.username && "failure"}
            aria-label="Email label"
          />
        </div>
        <TextInput
          id="username"
          placeholder="name@store.com"
          aria-label="Email input"
          type="email"
          {...register("username", { required: true })}
          color={errors.username && "failure"}
          helperText={errors.username && "Email is required"}
        />
      </div>

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

      <div className="flex items-center gap-2">
        <Checkbox
          id="remember"
          aria-label="Remember-me checkbox"
          {...register("remember")}
        />
        <Label htmlFor="remember">Remember me?</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
