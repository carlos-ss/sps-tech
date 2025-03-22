import { create } from "zustand";

export const useStore = create(() => ({
  temp: {
    someValue: "thisvalue",
  },
}));
