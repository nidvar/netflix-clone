import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useContentTypeStore } from "../store/contentType";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

function WatchPage() {
  const params = useParams();
  const contentTypeStore = useContentTypeStore();

  const chevCSS = "hand-hover transition-transform duration-300 ease-in-out group-hover:scale-105"

  const grabTrailer = async ()=>{
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_API + '/movies/' + contentTypeStore.contentType + '/trailer/' + params.id, {credentials: "include" as RequestCredentials});
      if(response.ok){
        const data = await response.json();
        console.log(data);
      }else{
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    grabTrailer();
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black relative">
        <div className="flex flex-col">
          <div className="trailer-chevron-container">
            <ChevronLeft size={32} className={chevCSS + ' trailer-chevron'} strokeWidth={1} onClick={function(){}}/>
            <ChevronRight size={32} className={chevCSS + ' trailer-chevron'} strokeWidth={1} onClick={function(){}}/>
          </div>
        </div>



      </div>
    </>
  )
}

export default WatchPage