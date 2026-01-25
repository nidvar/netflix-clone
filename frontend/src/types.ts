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
  searchValue: string;
  message: string;
  movies: MovieType[];
  tvshows: MovieType[];
  people: PeopleType[];
  setMovies: (results: MovieType[]) => void;
  setTvshows: (results: MovieType[]) => void;
  setPeople: (results: PeopleType[]) => void;
  setSearchValue: (value: string) => void;
  setMessage: (message: string) => void;
}

export type DataObjectType = {
  backdropURL?: string
  posterURL?: string
  title: string
  id: number
}

export type MovieSliderProps = {
  category: string
  ownData?: boolean
  peopleData?: PeopleType[]
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