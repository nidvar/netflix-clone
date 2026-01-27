import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronRight, ChevronLeft  } from "lucide-react";

import { useContentTypeStore } from "../store/contentTypeStore";

import type { MovieSliderProps, DataObjectType, MovieType, PeopleType } from "../types";
import { fetchRequest } from "../utils/functions";

function MovieSlider(props: MovieSliderProps) {

  const contentTypeStore = useContentTypeStore();

  const [data, setData] = useState<DataObjectType[]>([]);
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
      convertMovieData(data.movies.results);
    };
  };

  const convertMovieData = function(arr: MovieType[]){
    let newArr: DataObjectType[] = [];
    arr.forEach((item: MovieType)=>{
      if(item.backdrop_path == null && item.poster_path == null){
          return
        };
        newArr.push({
          backdropURL: item.backdrop_path || item.poster_path,
          posterURL: item.poster_path,
          title: item.title || item.original_title || item.name || item.original_name || '',
          id: item.id,
        });
    });
    setData(newArr);
  }

  const convertPeopleData = function(arr: PeopleType[]){
    let newArr: DataObjectType[] = [];
    arr.forEach((item: PeopleType)=>{
      if(item.profile_path == null){
          return
        };
        newArr.push({
          backdropURL: item.profile_path,
          posterURL: item.profile_path,
          title: item.name,
          id: item.id,
        });
    });
    setData(newArr);
  }

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
    if(props.peopleData){
      convertPeopleData(props.peopleData);
    }
  }, [props.peopleData]);

  useEffect(()=>{
    if(props.data){
      convertMovieData(props.data);
    }
  }, [props.data]);

  return (
    <>
      {
        data.length > 0 ?
          <div className={
            props.ownData ?
              "relative white watch-page-slider" : "relative white"
          }
          >
            <h1 className="white text-xl font-bold movie-slider-title">{formatted}</h1>
            <div
              className="slider-container"
              ref={sliderRef}
              onMouseEnter={() => setShowArrows(true)}
              onMouseLeave={() => setShowArrows(false)}
            >
              <div className="scroll-arrow-container group">
                {
                  showArrows === true ?
                    <>
                      <ChevronLeft size={cssPropertiesArrows.size} className={cssPropertiesArrows.className} strokeWidth={cssPropertiesArrows.className} onClick={scrollLeft} />
                    </> : ''
                }
              </div>
              {
                data.length > 0 ?
                  data.map((item) => {
                    if (item.backdropURL === null && item.posterURL === null) {
                      return;
                    }
                    return (
                      <div
                        className={
                          props.ownData ?
                            "hand-hover group flex flex-col gap-2 movie-slider-poster" :
                            "hand-hover group flex flex-col gap-2 slider-item "
                        }
                        key={item.id}
                      >
                        <img
                          alt="Movie image"
                          src={props.ownData ? imageSrc + item.posterURL : imageSrc + item.backdropURL}
                          className={"transition-transform duration-300 ease-in-out group-hover:scale-105"}
                          onClick={function () { navigate("/watch/" + item.id) }}
                        />
                        <p className="center">{item.title}</p>
                      </div>
                    )
                  }) : ''
              }
              <div className="scroll-arrow-container right-chevron group">
                {
                  showArrows === true ?
                    <>
                      <ChevronRight size={cssPropertiesArrows.size} className={cssPropertiesArrows.className} strokeWidth={cssPropertiesArrows.className} onClick={scrollRight} />
                    </> : ''
                }
              </div>
            </div>
          </div> : ''
      }
    </>
  )

}

export default MovieSlider