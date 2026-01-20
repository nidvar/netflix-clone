import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Info, Play } from "lucide-react";

import Navbar from "../../components/Navbar";
import MovieSlider from "../../components/MovieSlider";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";

import {useContentTypeStore} from "../../store/contentType";

function HomeScreen() {

  const movie_category = ["now_playing", "top_rated", "popular", "upcoming"];
  const tv_category = ["airing_today", "on_the_air", "popular", "top_rated"];

  const contentTypeStore = useContentTypeStore();

  let placeholderData = {
    backdrop_path: "/sK3z0Naed3H1Wuh7a21YRVMxYqt.jpg",
    title: "Extraction",
    overview: "Tyler Rake, a fearless black market mercenary, embarks on the most deadly extraction of his career when he's enlisted to rescue the kidnapped son of an imprisoned international crime lord.",
    poster_path: "/cWsBscZzwu5brg9YjNkGewRUvJX.jpg",
    media_type: "movie",
    release_date: "2023-03-15",
    adult: true
  }

  let data = useGetTrendingContent();

  useEffect(()=>{
    if(data === null || data === undefined || data.media_type === undefined){
      data = placeholderData;
    }
  }, [data])

  return (
    <>
      <Navbar />
      <img 
        src={"https://image.tmdb.org/t/p/original/" + data?.backdrop_path}
        alt="Hero Image" 
        className="absolute top-0 left-0 w-full h-full object-cover -z-50"
      />
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-black/30 -z-50" aria-hidden="true" />
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
          <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />
          <div className="white movie-info flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-heading">{data?.title || data?.name}</h1>
            <p>{data?.release_date || data?.first_air_date} | {data?.adult? '18+' : '13+'}</p>
            <p>{data?.overview}</p>
            <div className="flex gap-4 font-bold">
              <Link to='/' className="my-button bg-white black flex gap-2">
                <Play className="fill-black"/>
                Play
              </Link>
              <Link to='/' className="my-button bg-gray-400/75 flex gap-2">
                <Info />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black p-10">
        {
          contentTypeStore.contentType === 'movie'?
          movie_category.map((item)=>{
            return <MovieSlider category={item} key={item}/>
          }):
          tv_category.map((item)=>{
            return <MovieSlider category={item} key={item}/>
          })
        }
      </div>

    </>
  )
}

export default HomeScreen