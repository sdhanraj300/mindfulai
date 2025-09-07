import { create } from "zustand";

interface UserState {
  user: {
    name?: string;
    avatar?: string;
    email?: string;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: UserState["user"]) => set({ user }),
  clearUser: () => set({ user: null }),
}));
