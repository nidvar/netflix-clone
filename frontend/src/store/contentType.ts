import { create } from "zustand";

import type { ContentTypeStore } from "../types";

export const useContentTypeStore = create<ContentTypeStore>((set)=>{
    return {
        contentType: 'movie',
        setContentType: (contentType: string)=>{
            set({contentType: contentType});
        }
    }
});