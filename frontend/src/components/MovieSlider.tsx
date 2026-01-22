import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronRight, ChevronLeft  } from "lucide-react";

import { useContentTypeStore } from "../store/contentType";

import type { MovieSliderProps, MovieType } from "../types";
import { fetchRequest } from "../utils/functions";

function MovieSlider(props: MovieSliderProps) {

  const contentTypeStore = useContentTypeStore();

  const [data, setData] = useState<MovieType[]>([]);
  const [showArrows, setShowArrows] = useState(false);

  const navigate = useNavigate();

  const sliderRef = useRef<HTMLDivElement>(null);

  const formatting = props.category.replaceAll("_", " ");
  const formatted = formatting.charAt(0).toUpperCase() + formatting.slice(1);

  const imageSrc = "https://image.tmdb.org/t/p/w500";

  const cssPropertiesArrows = {
    size: 42,
    strokeWidth: 0.5,
    className: "scroll-arrow hand-hover transition-transform duration-300 ease-in-out group-hover:scale-105"
  }

  const grabData = async ()=>{
    const data = await fetchRequest('/movies/' +  contentTypeStore.contentType + '/categories/' + props.category);
    if(data.movies.results){
      setData(data.movies.results);
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
    if(!props.ownData){
      grabData();
    }
  }, [contentTypeStore.contentType]);

  useEffect(()=>{
    if(props.data && props.data.length > 0){
      setData(props.data);
    }
  }, [props.data]);

  return (
    <div className={
      props.ownData?
      "relative white watch-page-slider":"relative white"
      }
    >
      <h1 className="white text-xl font-bold">{formatted}</h1>
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
              <ChevronLeft size={cssPropertiesArrows.size} className={cssPropertiesArrows.className} strokeWidth={cssPropertiesArrows.className} onClick={scrollLeft}/>
            </>:''
          }
        </div>
        {
          data.length > 0?
          data.map((item)=>{
            return (
              <div 
                className={
                  props.ownData? 
                  "hand-hover group flex flex-col gap-2 movie-slider-poster":
                  "slider-item hand-hover group flex flex-col gap-2"
                } 
                key={item.id}
              >
                <img
                  alt="Movie image"
                  src={props.ownData? imageSrc + item.poster_path:  imageSrc + item.backdrop_path}
                  className={"transition-transform duration-300 ease-in-out group-hover:scale-105"}
                  onClick={function(){navigate("/watch/" + item.id)}}
                />
                <p className="center">{item.title? item.title: item.name}</p>
              </div>
            )
          }):''
        }
      <div className="scroll-arrow-container right-chevron group">
          {
            showArrows === true?
            <>
              <ChevronRight size={cssPropertiesArrows.size} className={cssPropertiesArrows.className} strokeWidth={cssPropertiesArrows.className} onClick={scrollRight}/>
            </>:''
          }
        </div>
      </div>
    </div>
  )

}

export default MovieSlider