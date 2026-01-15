import { LogOut, Menu, Search } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/authUser";
import { useContentTypeStore } from "../store/contentType";

function Navbar() {
  const authStore = useAuthStore();
  const contentType = useContentTypeStore();
  return (
    <>
        <div className="header white">
            <div className="inner-header">
                <div className="flex center gap-3 mobile">
                    <Link to="/" >
                        <img className="logo" src="/netflix-logo.png" alt="logo" />
                    </Link>
                    <div className="header-desktop-menu mobile-hide">
                        <Link className="hover-underline" to="/" onClick={function(){contentType.setContentType('movie')}}>Movies</Link>
                        <Link className="hover-underline" to="/" onClick={function(){contentType.setContentType('tvshow')}}>Tv Shows</Link>
                        <Link className="hover-underline" to="/" onClick={function(){contentType.setContentType('history')}}>Search History</Link>
                    </div>
                </div>
                <div className="flex center gap-3">
                    <Search className="hand-hover" />
                    <img src="/avatar1.png" className="hand-hover profile-image" />
                    <LogOut className="hand-hover" onClick={function(){authStore.logout()}}/>
                    <Menu className="hand-hover desktop-hide" />
                </div>
            </div>
            <div className="desktop-hide flex flex-col gap-2 mobile-menu ">
                <Link to="/" >Movies</Link>
                <Link to="/" >Tv Shows</Link>
                <Link to="/" >Search History</Link>
            </div>
        </div>
    </>
  )
}

export default Navbar;