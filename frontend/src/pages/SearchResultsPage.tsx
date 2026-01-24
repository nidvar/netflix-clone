import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useSearchResultsStore } from '../store/searchResultsStore';

function SearchResults() {
  const navigate = useNavigate();

  const searchStore = useSearchResultsStore();

  const [results, setResults] = useState('');

  useEffect(()=>{
    console.log('searching: ', searchStore.searching);
    if(
      searchStore.movies.length === 0 || 
      searchStore.tvshows.length === 0 || 
      searchStore.people.length === 0
    ){
      setResults('No results found');
    }
  }, [searchStore.searching]);

  return (
    <div className='white'>
      <h1>Search Results</h1>
      <p>{searchStore.searching? "Searching..." : results}</p>

      <div className='search-results-container flex flex-wrap'>
        {
          searchStore.searching? 
          'searching....' : ''
        }
      </div>
      
    </div>
  )
}

export default SearchResults