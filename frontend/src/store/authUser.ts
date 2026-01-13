import { create } from "zustand";

import type { AuthStore } from "../types";

const backendAPI = import.meta.env.VITE_BACKEND_API;

export const useAuthStore = create<AuthStore>((set)=>{
    return {
        user: null,
        signUp: async function(email: string, username: string, password: string){
            const payload = {
                method: 'POST',
                credentials: 'include' as RequestCredentials,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            };
            try {
                const response = await fetch(backendAPI + '/api/auth/signup', payload);
                if(response.ok){
                    const data = await response.json();
                    return data.message;
                }else{
                    const errData = await response.json();
                    return errData.message;
                }
            } catch (error) {
                return 'Sign Up Error';
            }
        },
        login: async function(email: string, password: string){
            const payload = {
                method: "POST",
                credentials: "include" as RequestCredentials,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            };
            try {
                const response = await fetch("http://localhost:3001/api/auth/login", payload);
                if(response.ok){
                    const data = await response.json();
                    return data.message;
                }else{
                    const errData = await response.json();
                    return errData.message;
                }
            } catch (error) {
                console.log(error);
                return 'Login Error';
            }
        },
        logout: async function(){

        },
        checkAuth: async function(){

        }
    }
});