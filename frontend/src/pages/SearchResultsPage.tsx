import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchResultsStore } from '../store/searchResultsStore';

import MovieSlider from '../components/MovieSlider';

function SearchResults() {

  const navigate = useNavigate();
  const searchStore = useSearchResultsStore();

  useEffect(()=>{
    if(searchStore.searchValue == ''){
      navigate('/');
    };
  }, []);

  return (
    <div className="bg-black white pt-1">
      <div className='search-page-container min-h-screen'>
        <h1 className='center'>Search Results</h1>
        <div className="flex flex-col gap-10 p-10 bg-black">
          <MovieSlider category='Movies' ownData={true} data={searchStore.movies} />
          <MovieSlider category='Shows' ownData={true} data={searchStore.tvshows} />
          <p className='white center'>{searchStore.message}</p>
        </div>
      </div>
    </div>
  )
}

export default SearchResults