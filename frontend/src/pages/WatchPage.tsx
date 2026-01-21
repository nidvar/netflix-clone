import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useContentTypeStore } from "../store/contentType";

function WatchPage() {
  const params = useParams();
  const contentTypeStore = useContentTypeStore();
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
    <div>
        <div className='main'>
            <h1>Watch Page</h1>
        </div>
    </div>
  )
}

export default WatchPage