"use client";
import { create } from "zustand";

type AuthState = {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  setAuth: (payload: { user: { id: string; email: string; role: string }; token: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: ({ user, token }) => {
    sessionStorage.setItem("auth", JSON.stringify({ user, token }));
    set({ user, token });
  },
  logout: () => {
    sessionStorage.removeItem("auth");
    set({ user: null, token: null });
  }
}));
