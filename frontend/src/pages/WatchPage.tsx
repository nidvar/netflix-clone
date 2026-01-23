// external imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { ChevronLeft, ChevronRight } from "lucide-react";

// local imports
import { useContentTypeStore } from "../store/contentType";
import { useSearchResultsStore } from "../store/searchResults";

import type { Trailer, MovieType } from "../types";
import Navbar from "../components/Navbar";
import { fetchRequest } from "../utils/functions";
import MovieSlider from "../components/MovieSlider";
import SearchResults from "../components/SearchResults";

function WatchPage() {
  const params = useParams();
  const contentTypeStore = useContentTypeStore();
  const searchResultsStore = useSearchResultsStore();

  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [currentTrailer, setCurrentTrailer] = useState(0);
  const [details, setDetails] = useState<MovieType | null>(null);
  const [similarContent, setSimilarContent] = useState<MovieType[]>([]);

  const chevronCSS = "hand-hover transition-transform duration-300 ease-in-out group-hover:scale-105 trailer-chevron";

  const grabTrailer = async ()=>{
    const data = await fetchRequest('/movies/' + contentTypeStore.contentType + '/trailer/' + params.id)
    const trailersArray = data.trailers.results.filter((item:any)=>{
      if(item.type === "Trailer" || item.type === "Clip"){
        return item;
      }
    })
    setTrailers(trailersArray);
  };

  const grabContentDetails = async ()=>{
    const data = await fetchRequest('/movies/' + contentTypeStore.contentType + '/details/' + params.id);
    setDetails(data.details);
  }

  const getSimilarContent = async ()=>{
    const data = await fetchRequest('/movies/' + contentTypeStore.contentType + '/similar/' + params.id);
    setSimilarContent(data.details.results);
  };

  const nextTrailer = function(){
    if(currentTrailer === trailers.length-1){
      return
    }else{
      setCurrentTrailer(currentTrailer+1);
    }
  }

  const prevTrailer = function(){
    if(currentTrailer === 0){
      return
    }else{
      setCurrentTrailer(currentTrailer-1);
    }
  }

  useEffect(()=>{
    grabTrailer();
    grabContentDetails();
    getSimilarContent();
    window.scrollTo(0, 0);
  }, [params.id])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black relative">
        <div className="flex flex-col">
          {
            searchResultsStore.searching === true?
            <SearchResults />:
            <>
              <div className="trailer-chevron-container">
                {
                  trailers.length>0?
                  <>
                    <ChevronLeft size={32} className={chevronCSS} strokeWidth={1} onClick={prevTrailer}/>
                    <ChevronRight size={32} className={chevronCSS} strokeWidth={1} onClick={nextTrailer}/>
                  </>:''
                }
              </div>
              <div className="trailer-container">
                {
                  trailers.length>0?
                  <ReactPlayer
                    controls={true}
                    width={"80%"}
                    height={"70vh"}
                    className='mx-auto overflow-hidden rounded-lg'
                    src={`https://www.youtube.com/watch?v=${trailers[currentTrailer].key}`}
                  />:<div>Loading...</div>
                }
              </div>
                {
                  details?
                  <>
                    <div className="description-container flex flex-wrap white">
                      <div className="flex flex-col justify-center gap-2 max-w-xl mb-10">
                        <h1 className="text-5xl font-bold">{details?.original_title || details?.original_name}</h1>
                        <p>{details?.release_date} | {details?.adult? "18+": "PG"}</p>
                        <p>{details?.overview}</p>
                      </div>
                      <div>
                        <img src={'https://image.tmdb.org/t/p/original/' + details?.poster_path} />
                      </div>
                    </div>
                    <div className="white">
                      <h1 className="text-3xl font-bold watch-page-slider">Similar Movies / TV shows</h1>
                      <MovieSlider category='' ownData={true} data={similarContent}/>
                    </div>
                  </>:<div>Loading...</div>
                }
            </>
          }
        </div>
      </div>
    </>
  )
}

export default WatchPage