import { useState, useEffect } from 'react';


import { useSearchResultsStore } from '../store/searchResultsStore';

import MovieSlider from '../components/MovieSlider';

function SearchResults() {
  const searchStore = useSearchResultsStore();

  const [results, setResults] = useState('');

  useEffect(()=>{
    console.log('searching: ', searchStore.searchValue);
    if(
      searchStore.movies.length === 0 || 
      searchStore.tvshows.length === 0 || 
      searchStore.people.length === 0
    ){
      setResults('No results found');
    }
  }, [searchStore.searchValue]);

  return (
    <div className="bg-black white pt-1">
      <div className='search-page-container min-h-screen'>
        <h1 className='center'>Search Results</h1>
        <div className="flex flex-col gap-10 p-10 bg-black">
          <MovieSlider category='Movies' ownData={true} data={searchStore.movies} />
          <MovieSlider category='TV Shows' ownData={true} data={searchStore.tvshows} />
          <MovieSlider category='People' ownData={true} peopleData={searchStore.people} />
        </div>
        <p>{results}</p>
      </div>
    </div>
  )
}

export default SearchResults