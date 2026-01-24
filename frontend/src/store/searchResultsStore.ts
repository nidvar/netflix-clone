import { create } from "zustand";

import type { SearchResultType, SearchStoreType } from "../types";

export const useSearchResultsStore = create<SearchStoreType>((set)=>{
  return {
    searching: false,
    movies: [],
    tvshows: [],
    people: [],
    setMovies: (results: SearchResultType[]) => set({ movies: results }),
    setTvshows: (results: SearchResultType[]) => set({ tvshows: results }),
    setPeople: (results: SearchResultType[]) => set({ people: results }),
    startSearching: () => set({ searching: true }),
    stopSearching: () => set({ searching: false }),
  }
})