import { useEffect, useState } from "react";

import { useContentTypeStore } from "../store/contentType";

const useGetTrendingContent = () => {
    const contentType = useContentTypeStore();

    const [trendingContent, setTrendingContent] = useState<any>(null);

    const grabTrendingContent = async () => {
        const response = await fetch(import.meta.env.VITE_BACKEND_API + '/api/movies/' + contentType.contentType + '/trending', {credentials: "include" as RequestCredentials});
        const data = await response.json();
        setTrendingContent(data.movie);
    }

    useEffect(() => {
        grabTrendingContent();
    }, [contentType.contentType]);

    return trendingContent;
};

export default useGetTrendingContent;