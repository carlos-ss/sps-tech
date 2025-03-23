export type Form = {
  id: number;
  email: string;
  username: string;
  password: string;
  remember: boolean;
};
export interface ILoginForm
  extends Pick<Form, "username" | "password" | "remember"> {}

export interface IRegisterForm extends Omit<Form, "remember"> {}

export interface IFormProps {
  type: "login" | "register";
  onDataSubmit: (data: Form) => void;
}
