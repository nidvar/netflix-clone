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
            const response = await fetch(backendAPI + '/api/auth/signup', payload);
            if(response.ok){
                const data = await response.json();
                if(data.message === 'User created successfully'){
                    set({user: data.user});
                };
                return data.message;
            }else{
                return 'Error';
            }
        },
        login: async function(email: string, password: string){
            console.log(email, password);
        },
        logout: async function(){

        },
        checkAuth: async function(){

        }
    }
});