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

export type SearchStoreType = {
  searching: boolean;
  movies: SearchResultType[];
  tvshows: SearchResultType[];
  people: SearchResultType[];
  setMovies: (results: SearchResultType[]) => void;
  setTvshows: (results: SearchResultType[]) => void;
  setPeople: (results: SearchResultType[]) => void;
  startSearching: () => void;
  stopSearching: () => void;
}

export type MovieSliderProps = {
  category: string
  ownData?: boolean
  data?: MovieType[]
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

export type PeopleType = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string | null,
  known_for: MovieType[]
}

export type SearchResultType = MovieType | PeopleType

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

export type Body = {
  email: string
  password: string
  username?: string
}