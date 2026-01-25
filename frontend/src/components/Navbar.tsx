import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, Search } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from "../store/authUserStore";
import { useContentTypeStore } from "../store/contentTypeStore";
import { useSearchResultsStore } from "../store/searchResultsStore";
import { fetchRequest } from "../utils/functions";
import type { MovieType } from "../types";

function Navbar() {
  const authStore = useAuthStore();
  const contentType = useContentTypeStore();
  const searchStore = useSearchResultsStore();

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const clearSearchResults = function(){
    searchStore.setMovies([]);
    searchStore.setTvshows([]);
    searchStore.setPeople([]);
  }

  const searchAPI = async function(value: string){
    searchStore.setMessage('');
    if(value === '' || value === null || value === undefined) return;
    try {
      const results = await Promise.all([
        fetchRequest('/search/movies/' + value),
        fetchRequest('/search/tv/' + value),
        fetchRequest('/search/person/' + value)
      ]);

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

  const searchContent = function(e: React.ChangeEvent<HTMLInputElement>){
    const value = e.target.value;
    searchStore.setSearchValue(value);
    setInputValue(value);

    if(value !== ''){
      navigate('/search');
    }else{
      navigate('/');
    }

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(()=>{
      clearSearchResults();
      searchAPI(value);
    }, 800);
  };

  const openSearch = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setShowSearch(true);
  }

  const closeSearch = function(e: Event){
    if(searchRef.current && !searchRef.current.contains(e.target as Node)){
      setShowSearch(false);
      setInputValue('');
    }
  }

  const cleanup = function(){
    document.removeEventListener("mousedown", closeSearch)
  }

  useEffect(()=>{
    document.addEventListener("mousedown", closeSearch);
    return cleanup
  }, [])

  useEffect(()=>{
    if(inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  return (
    <>
      <div className="header white" ref={searchRef}>
        <div className="inner-header">
          <div className="flex center gap-3 mobile">
            <Link to="/" >
              <img className="logo" src="/netflix-logo.png" alt="logo" />
            </Link>
            <div className="header-desktop-menu mobile-hide" onClick={function(){setShowSearch(false); setInputValue('')}}>
              <Link className="hover-underline" to="/" onClick={function(){contentType.setContentType('movie')}}>Movies</Link>
              <Link className="hover-underline" to="/" onClick={function(){contentType.setContentType('tv')}}>Shows</Link>
              <Link className="hover-underline" to="/" onClick={function(){console.log('search history')}}>Search History</Link>
            </div>
          </div>
          <div className="flex center gap-3">
            {
              showSearch === true?
              <input ref={inputRef} className="search-input" value={inputValue} onChange={function(e){searchContent(e)}}/>:
              <Search id="search-icon" className="hand-hover" onClick={function(e){openSearch(e)}}/>
            }
            <img src="/avatar1.png" className="hand-hover profile-image" />
            <LogOut className="hand-hover" onClick={function(){authStore.logout()}}/>
            <Menu className="hand-hover desktop-hide" onClick={function(){setShowMenu(!showMenu)}} />
          </div>
        </div>
        {
          showMenu?
            <div className="desktop-hide flex flex-col gap-2 mobile-menu" onClick={function(){setShowSearch(false); setInputValue('')}}>
            <Link to="/" onClick={function(){contentType.setContentType('movie')}}>Movies</Link>
            <Link to="/" onClick={function(){contentType.setContentType('tv')}}>Shows</Link>
            <Link to="/" onClick={function(){console.log('search history')}}>Search History</Link>
          </div>:
          <></>
        }
      </div>
    </>
  )
}

export default Navbar;