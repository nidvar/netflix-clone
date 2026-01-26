import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchResultsStore } from "../store/searchResultsStore";
import { fetchRequest } from "../utils/functions";
import type { HistoryItem, MovieType } from '../types';
import { Link } from 'react-router-dom';

function historyPage() {

  const searchStore = useSearchResultsStore();
  const navigate = useNavigate();

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const grabHistory = async function(){
    const data = await fetchRequest('/search/history');

    const sortedHistory = [...data.history].sort(
      (a: HistoryItem, b: HistoryItem) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setHistory(sortedHistory);
  }

  const searchAPI = async function(value: string){
    try {
      const results = await Promise.all([
        fetchRequest('/search/movies/' + value),
        fetchRequest('/search/tv/' + value),
        fetchRequest('/search/person/' + value)
      ]);

      searchStore.setSearchValue(value);

      if(results[0].movies.length === 0 && results[1].tvshows.length === 0){
        searchStore.setMessage('No results');
      }

      searchStore.setMovies(results[0].movies);
      searchStore.setTvshows(results[1].tvshows);

      const people = results[2].people;
      if(people && people.length > 0){
        if(people[0].known_for && people[0].known_for.length > 0){
          people[0].known_for.forEach((movie: MovieType) => {
            results[0].movies.push(movie);
          });
        }
      };

    } catch (error) {
      console.log(error);
    }
  }

  const goToSearchPage = async function(item: string){
    await searchAPI(item);
    navigate('/search');
  }

  useEffect(()=>{
    grabHistory();
  }, []);

  return (
    <div className="bg-black white pt-1">
      <div className='search-page-container min-h-screen'>
        <h1 className='center'>Search History</h1>
        <div className="flex flex-col gap-10 p-10 bg-black">
          {
            history.length > 0?
            history.map((item: HistoryItem, index)=>{
              return (
                <div key={index}>
                  <Link to="" onClick={function(e){e.preventDefault(); goToSearchPage(item.title)}} >
                    <p key={index}>{item.title}</p>
                  </Link>
                </div>
              )
            }):null
          }
        </div>
      </div>
    </div>
  )
}

export default historyPage