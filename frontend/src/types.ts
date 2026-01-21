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

export type MovieSliderProps = {
  category: string
}

export type TvSliderProps = {
  category: string
}

export type MovieType = {
  adult: boolean
  backdrop_path: string
  id: number
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title?: string
  video: boolean,
  name?:string
}

export type Trailer = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: number
  type: string
  official: boolean,
  published_at: string
  id: number
}