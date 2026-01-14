import { create } from "zustand";

import type { AuthStore } from "../types";

const backendAPI = import.meta.env.VITE_BACKEND_API;

export const useAuthStore = create<AuthStore>((set)=>{
    return {
        user: localStorage.getItem('netflixCloneImage') || null,
        isLoading: false,
        signedIn: false,
        signUp: async function(email: string, username: string, password: string){
            set({isLoading: true});
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
                    set({isLoading: false});
                    return data.message;
                }else{
                    const errData = await response.json();
                    set({isLoading: false});
                    return errData.message;
                }
            } catch (error) {
                set({isLoading: false});
                return 'Sign Up Error';
            }
        },
        login: async function(email: string, password: string){
            set({isLoading: true});
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
                const response = await fetch(backendAPI + "/api/auth/login", payload);
                if(response.ok){
                    const data = await response.json();
                    localStorage.setItem('netflixCloneImage', data.user.image);
                    set({signedIn: true});
                    set({isLoading: false});
                    return data.message;
                }else{
                    const errData = await response.json();
                    set({isLoading: false});
                    return errData.message;
                }
            } catch (error) {
                console.log(error);
                set({isLoading: false});
                return 'Login Error';
            }
        },
        logout: async function(){
            const payload = {
                method: "POST",
                credentials: "include" as RequestCredentials
            };
            try {
                const response = await fetch(backendAPI + "/api/auth/logout", payload);
                const data= await response.json();
                localStorage.setItem('netflixCloneImage', '');
                set({signedIn: false});
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        checkAuth: async function(){
            try {
                const response = await fetch(backendAPI + "/api/auth/authcheck", {credentials: "include" as RequestCredentials});
                console.log(response.ok)
                set({signedIn: response.ok});
                console.log(await response.json());
            } catch (error) {
                set({signedIn: false});
                console.log(error);
            }
        }
    }
});