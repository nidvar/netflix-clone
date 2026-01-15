import { Info, Play } from "lucide-react";

import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

import useGetTrendingContent from "../../hooks/useGetTrendingContent";

function HomeScreen() {

  const grabMovies = async () => {
    console.log("grabbing movies");
    const response = await fetch(
      "http://localhost:3001/api/movies/movie/trending",
      { credentials: "include" as RequestCredentials }
    );
    const data = await response.json();
  };

  const data = useGetTrendingContent();

  return (
    <>
      <Navbar />
      <img 
        src="/extraction.jpg" 
        alt="Hero Image" 
        className="absolute top-0 left-0 w-full h-full object-cover -z-50"
      />
      <div className="absolute top-0 left-0 w-full h-full object-cover bg-black/30 -z-50" aria-hidden="true" />
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
        <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />
        <div className="white movie-info flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-heading">Extraction</h1>
          <p>2024 | pg-13</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
    </>
  )
}

export default HomeScreen