import type { Body } from "../types";

export const fetchRequest = async (url: string)=>{
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_API + url, {credentials: "include" as RequestCredentials})
    const data = await response.json();
    if(data.message === 'Unauthorized: No token provided'){
        console.log(data);
    }
    return data;
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
    return data;
  } catch (error) {
    console.log(error, url);
  }
}

export const fetchDeleteRequest = async (url: string)=>{
  const payload = {
    method: 'DELETE',
    credentials: "include" as RequestCredentials
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_API + url, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, url);
  }
}

export const readableDate = function (input?: string | Date): string {
    if (!input) return "unknown date"; // handles undefined/null

    const date = new Date(input);
    if (isNaN(date.getTime())) return "invalid date"; // handles bad input

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    return date.toLocaleDateString(undefined, options);
}