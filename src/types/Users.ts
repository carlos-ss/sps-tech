export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface ICurrentUser extends Omit<IUser, "password"> {}

export interface IToken {
  token: string;
}
