import { create } from "zustand";

import type { MovieType, PeopleType, SearchStoreType } from "../types";

export const useSearchResultsStore = create<SearchStoreType>((set)=>{
  return {
    searchValue: '',
    message: '',
    movies: [],
    tvshows: [],
    people: [],
    setMovies: (results: MovieType[]) => set({ movies: results }),
    setTvshows: (results: MovieType[]) => set({ tvshows: results }),
    setPeople: (results: PeopleType[]) => set({ people: results }),
    setSearchValue: (value: string) => set({ searchValue: value }),
    setMessage: (message: string) => set({ message: message }),
  }
})