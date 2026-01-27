import { create } from "zustand";

import type { AuthStore } from "../types";

import { fetchPostRequest, fetchRequest } from "../utils/functions";

export const useAuthStore = create<AuthStore>((set) => {
  return {
    user: localStorage.getItem('netflixCloneImage') || null,
    isLoading: false,
    signedIn: false,
    signUp: async function (email: string, username: string, password: string) {
      set({ isLoading: true });
      const body = {
        email: email,
        username: username,
        password: password
      }
      const res = await fetchPostRequest('/auth/signup', body);
      set({ isLoading: false });
      return res.message;
    },
    login: async function (email: string, password: string) {
      set({ isLoading: true });
      const body = {
        email: email,
        password: password
      }
      const res = await fetchPostRequest('/auth/login', body);
      if (res.message === 'Login successful') {
        set({ signedIn: true });
      }
      set({ isLoading: false });
      return res.message;
    },
    logout: async function () {
      try {
        await fetchPostRequest("/auth/logout");
        localStorage.setItem('netflixCloneImage', '');
        set({ signedIn: false });
      } catch (error) {
        console.log(error);
      }
    },
    checkAuth: async function () {
      const res = await fetchRequest('/auth/authcheck');
      if (res.message === 'Authorized') {
        set({ signedIn: true });
        return;
      } else {
        const res = await fetchPostRequest('/auth/refreshtoken');
        if (res.message === 'access token refreshed') {
          set({ signedIn: true });
          window.location.reload();
        } else {
          set({ signedIn: false });
        }
      }
    }
  }
});