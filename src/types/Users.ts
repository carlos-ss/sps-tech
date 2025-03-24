export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface ICurrentUser extends Omit<IUser, "password" | "email"> {}

export interface IToken {
  token: string;
}
