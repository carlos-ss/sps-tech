import { ICart } from "@/types/Cart";
import { ICurrentUser } from "@/types/Users";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  loggedIn: boolean;
  user: ICurrentUser;
  cart: ICart | null;
  setLoggedIn: (value: boolean) => void;
  setCart: (cart: ICart) => void;
  setUser: (user: ICurrentUser) => void;
};

export const useStore = create<State, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
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

      cart: null,
      setCart: (cart: ICart) => {
        set(() => ({ cart }));
      },
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
