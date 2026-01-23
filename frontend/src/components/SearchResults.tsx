import { useState, useEffect } from 'react';

import { useSearchResultsStore } from '../store/searchResults';

function SearchResults() {
  const searchStore = useSearchResultsStore();
  console.log(searchStore)

  useEffect(()=>{
  }, []);

  return (
    <div className='white'>
      <h1>Search Results</h1>
    </div>
  )
}

export default SearchResults