import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, Search } from "lucide-react";
import { Link } from 'react-router-dom';

import { useAuthStore } from "../store/authUser";
import { useContentTypeStore } from "../store/contentType";
import { useSearchResultsStore } from "../store/searchResults";

function Navbar() {
  const authStore = useAuthStore();
  const contentType = useContentTypeStore();
  const searchStore = useSearchResultsStore();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const searchContent = function(e: React.ChangeEvent<HTMLInputElement>){
    searchStore.startSearching();
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(()=>{
      console.log('api call', value);
    }, 800);
  };

  const openSearch = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setShowSearch(!showSearch);
  }

  const closeSearch = function(e: Event){
    if(searchRef.current && !searchRef.current.contains(e.target as Node)){
      setShowSearch(false);
    }
  }

  const cleanup = function(){
    document.removeEventListener("click", closeSearch)
  }

  useEffect(()=>{
    document.addEventListener("click", closeSearch);
    return cleanup
  }, [])

  useEffect(()=>{
    if(inputRef.current) inputRef.current.focus();
  }, [showSearch])

  useEffect(()=>{
    if(searchValue === ''){
      searchStore.stopSearching();
    }
  }, [searchValue])

  return (
    <>
      <div className="header white" ref={searchRef}>
        <div className="inner-header">
          <div className="flex center gap-3 mobile">
            <Link to="/" >
              <img className="logo" src="/netflix-logo.png" alt="logo" />
            </Link>
            <div className="header-desktop-menu mobile-hide">
              <Link className="hover-underline" to="/" onClick={function(){contentType.setContentType('movie')}}>Movies</Link>
              <Link className="hover-underline" to="/" onClick={function(){contentType.setContentType('tv')}}>Tv Shows</Link>
              <Link className="hover-underline" to="/" onClick={function(){console.log('search history')}}>Search History</Link>
            </div>
          </div>
          <div className="flex center gap-3">
            {
              showSearch === true?
              <input ref={inputRef} className="search-input" value={searchValue} onChange={function(e){searchContent(e)}}/>:
              <Search id="search-icon" className="hand-hover" onClick={function(e){openSearch(e)}}/>
            }
            <img src="/avatar1.png" className="hand-hover profile-image" />
            <LogOut className="hand-hover" onClick={function(){authStore.logout()}}/>
            <Menu className="hand-hover desktop-hide" onClick={function(){setShowMenu(!showMenu)}} />
          </div>
        </div>
        {
          showMenu?
            <div className="desktop-hide flex flex-col gap-2 mobile-menu ">
            <Link to="/" onClick={function(){contentType.setContentType('movie')}}>Movies</Link>
            <Link to="/" onClick={function(){contentType.setContentType('tv')}}>Tv Shows</Link>
            <Link to="/" onClick={function(){console.log('search history')}}>Search History</Link>
          </div>:
          <></>
        }
      </div>
    </>
  )
}

export default Navbar;