import { useEffect, useState } from "react";

import { useContentTypeStore } from "../store/contentType";
import { fetchRequest } from "../utils/functions";

const useGetTrendingContent = () => {

    const contentType = useContentTypeStore();

    const [trendingContent, setTrendingContent] = useState<any>(null);

    const grabTrendingContent = async () => {
        const data = await fetchRequest('/movies/' + contentType.contentType + '/trending')
        if(data.movie){
            setTrendingContent(data.movie);
        }
    }

    useEffect(() => {
        grabTrendingContent();
    }, [contentType.contentType]);

    return trendingContent;
};

export default useGetTrendingContent;