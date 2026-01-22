import type { Body } from "../types";

export const fetchRequest = async (url: string)=>{
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_API + url, {credentials: "include" as RequestCredentials})
        if(response.ok){
            const data = await response.json();
            console.log(data, url);
            return data;
        }else{
            console.log('error', url);
            return 'error' + url;
        }
    } catch (error) {
        console.log(error);
        return 'server error' 
    }
}

export const fetchPostRequest = async (url: string, body?: Body)=>{
    const payload = {
        method: 'POST',
        credentials: "include" as RequestCredentials,
        headers: {
            "Content-Type": "application/json",
        },
        body: body? JSON.stringify(body): undefined
    }
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_API + url, payload);
        const data = await response.json();
        console.log(data, url);
        return data;
    } catch (error) {
        console.log(error, url);
    }
}