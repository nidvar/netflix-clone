import { create } from "zustand";

import type { SearchResultType, SearchStoreType } from "../types";

export const useSearchResultsStore = create<SearchStoreType>((set)=>{
  return {
    searching: false,
    searchResults: [],
    setSearchResults: (results: SearchResultType[]) => set({ searchResults: results }),
    startSearching: () => set({ searching: true }),
    stopSearching: () => set({ searching: false }),
  }
})