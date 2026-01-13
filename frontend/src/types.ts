export type AuthStore = {
    user: any | null;
    login: (email: string, password: string)=> Promise<void>;
    logout: ()=> Promise<void>;
    signUp: (email: string, username: string, password: string)=> Promise<string>;
    checkAuth: ()=> Promise<void>;
}