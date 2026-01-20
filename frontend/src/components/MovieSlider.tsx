import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft  } from "lucide-react";

import { useContentTypeStore } from "../store/contentType";

import type { MovieSliderProps, MovieType } from "../types";

function MovieSlider(props: MovieSliderProps) {

  const contentTypeStore = useContentTypeStore();

  const [data, setData] = useState<MovieType[]>([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const formatting = props.category.replaceAll("_", " ");
  const formatted = formatting.charAt(0).toUpperCase() + formatting.slice(1);

  const cssPropertiesArrows = {
    size: 42,
    strokeWidth: 0.5,
    className: "scroll-arrow hand-hover transition-transform duration-300 ease-in-out group-hover:scale-105"
  }

  const grabData = async ()=>{
    const payload = {
      method: 'GET',
      credentials: "include" as RequestCredentials,
    }
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_API + '/api/movies/' +  contentTypeStore.contentType + '/categories/' + props.category, payload);
      if(response.ok){
        const data = await response.json();
        setData(data.movies.results);
      }else{
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300, // pixels to scroll left
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300, // pixels to scroll right
        behavior: "smooth",
      });
    }
  };

  useEffect(()=>{
    grabData();
  }, [contentTypeStore.contentType]);

  return (
    <div className="slider-section relative white">
      <h1 className="white">{formatted}</h1>
      <div
        className="slider-container" 
        ref={sliderRef}
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <div className="scroll-arrow-container group">
          {
            showArrows === true?
            <>
              <ChevronLeft size={cssPropertiesArrows.size} className={cssPropertiesArrows.className} stroke-width={cssPropertiesArrows.className} onClick={scrollLeft}/>
              <ChevronRight  size={cssPropertiesArrows.size} className={cssPropertiesArrows.className} stroke-width={cssPropertiesArrows.className} onClick={scrollRight}/>
            </>:''
          }
        </div>
        {
          data.length > 0?
          data.map((item)=>{
            return (
              <div className="slider-item hand-hover group flex flex-col gap-2" key={item.id}>
                <img
                  alt="Movie image"
                  src={"https://image.tmdb.org/t/p/w500" + item.backdrop_path}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <p className="center">{item.title? item.title: item.name}</p>
              </div>
            )
          }):''
        }
      </div>
    </div>
  )

}

export default MovieSlider