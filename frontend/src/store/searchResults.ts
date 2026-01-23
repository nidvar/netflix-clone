import { create } from "zustand";

import type { MovieType, SearchStoreType } from "../types";

export const useSearchResultsStore = create<SearchStoreType>((set)=>{
  return {
    searching: false,
    searchResults: [],
    setSearchResults: (results: MovieType[]) => set({ searchResults: results }),
    startSearching: () => set({ searching: true }),
    stopSearching: () => set({ searching: false }),
  }
})