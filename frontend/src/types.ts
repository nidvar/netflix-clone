export type AuthStore = {
    user: any | null;
    login: (email: string, password: string)=> Promise<string>;
    signUp: (email: string, username: string, password: string)=> Promise<string>;
    logout: ()=> Promise<void>;
    checkAuth: ()=> Promise<void>;
}