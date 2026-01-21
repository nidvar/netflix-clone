import { useEffect, useState } from "react";

import { useContentTypeStore } from "../store/contentType";

const useGetTrendingContent = () => {
    const contentType = useContentTypeStore();

    const [trendingContent, setTrendingContent] = useState<any>(null);

    const grabTrendingContent = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API + '/movies/' + contentType.contentType + '/trending', {credentials: "include" as RequestCredentials});
            if(response.ok){
                const data = await response.json();
                setTrendingContent(data.movie);
            }else{
                setTrendingContent(null);
            }
        } catch (error) {
            console.log(error);
            setTrendingContent(null);
        }
    }

    useEffect(() => {
        grabTrendingContent();
    }, [contentType.contentType]);

    return trendingContent;
};

export default useGetTrendingContent;