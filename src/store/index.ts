import { ICurrentUser } from "@/types/Users";
import { create } from "zustand";

type State = {
  temp: {
    someValue: string;
  };
};
type Actions = {
  setSomething: (value: boolean) => void;
};

export const useStore = create<State & Actions>((set) => ({
  temp: {
    someValue: "thisvalue",
  },
  setSomething: (value: boolean) => {
    set(() => ({ temp: { someValue: value.toString() } }));
  },
}));

type UserState = {
  loggedIn: boolean;
  user: ICurrentUser;
};
type UserActions = {
  setLoggedIn: (value: boolean) => void;
};

// user store
export const userStore = create<UserState & UserActions>((set) => ({
  loggedIn: false,
  setLoggedIn: (value: boolean) => {
    set(() => ({ loggedIn: value }));
  },
  user: {
    id: 0,
    username: "",
    email: "",
  },
  setUser: (user: ICurrentUser) => {
    set(() => ({ user }));
  },
}));
