import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchResultsStore } from "../store/searchResultsStore";
import { fetchDeleteRequest, fetchRequest, readableDate } from "../utils/functions";
import type { HistoryItem, MovieType } from '../types';
import { Link } from 'react-router-dom';
import { Trash } from 'lucide-react';

function HistoryPage() {

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
    searchStore.setMessage('');
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

  const deleteHistoryItem = async function(id: number){
    await fetchDeleteRequest('/search/removesearchitem/' + id);
    grabHistory();
  }

  const deleteEntireHistory = async function(){
    await fetchDeleteRequest('/search/clearsearch');
    grabHistory();
  }

  useEffect(()=>{
    grabHistory();
  }, []);

  return (
    <div className="bg-black white pt-1">
      <div className='search-page-container min-h-screen'>
        <h1 className='center text-xl font-bold search-title'>Search History</h1>
        
        { history.length > 0?
          <div className='flex max-width-70vw py-5'>
            <p className='hand-hover' onClick={function(){deleteEntireHistory()}}>DELETE SEARCH HISTORY</p>
            <Trash className='ml-4'/>
          </div>:null
        }
        <div className="flex flex-col gap-4 bg-black max-width-70vw">
          {
            history.length > 0?
            history.map((item: HistoryItem, index)=>{
              return (
                <div key={index} className='flex justify-between'>
                  <Link to="" onClick={function(e){e.preventDefault(); goToSearchPage(item.title)}} >
                    <p key={index}>{item.title} - {readableDate(item.created_at)}</p>
                  </Link>
                  <Trash className='hand-hover' onClick={function(){deleteHistoryItem(item.id)}}/>
                </div>
              )
            }):null
          }
        </div>
      </div>
    </div>
  )
}

export default HistoryPage