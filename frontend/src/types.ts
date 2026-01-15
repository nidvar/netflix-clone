export type AuthStore = {
    user: string | null;
    isLoading: boolean;
    signedIn: boolean;
    login: (email: string, password: string)=> Promise<string>;
    signUp: (email: string, username: string, password: string)=> Promise<string>;
    logout: ()=> Promise<void>;
    checkAuth: ()=> Promise<void>;
}

export type ContentTypeStore = {
    contentType: string | null;
    setContentType: (contentType: string)=> void;
}