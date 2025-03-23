export type Form = {
  username: string;
  password: string;
  remember: boolean;
};

export interface IFormProps {
  onDataSubmit: (data: Form) => void;
}
