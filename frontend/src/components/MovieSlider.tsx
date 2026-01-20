import { useEffect, useState } from "react";

import { useContentTypeStore } from "../store/contentType";

import type { MovieSliderProps, MovieType } from "../types";

function MovieSlider(props: MovieSliderProps) {

  const contentTypeStore = useContentTypeStore();
  const [data, setData] = useState<MovieType[]>([]);

  const grabData = async ()=>{
    const payload = {
      method: 'GET',
      credentials: "include" as RequestCredentials,
    }
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_API + '/api/movies/movie/categories/' + props.category, payload);
      if(response.ok){
        const data = await response.json();
        console.log(data.movies.results)
        setData(data.movies.results);
      }else{
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    grabData();
  }, [contentTypeStore.contentType]);

  return (
    <div className="slider-section white">
      <h1 className="white">{props.category}</h1>
      <div className="slider-container">
        {
          data.length > 0?
          data.map((item)=>{
            return (
              <div className="slider-item" key={item.id}>
                <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} />
              </div>
            )
          }):''
        }
      </div>
    </div>
  )

}

export default MovieSlider