import { LogOut, Menu, Search } from "lucide-react";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
        <div className="header white bg-black">
            <div className="inner-header">
                <div className="header-side mobile">
                    <Link to="/" >
                        <img className="logo" src="/netflix-logo.png" alt="logo" />
                    </Link>
                    <div className="header-desktop-menu mobile-hide">
                        <Link to="/" >Movies</Link>
                        <Link to="/" >Tv Shows</Link>
                        <Link to="/" >Search History</Link>
                    </div>
                </div>
                <div className="header-side">
                    <Search className="hand-hover" />
                    <img src="/avatar1.png" className="hand-hover profile-image" />
                    <LogOut className="hand-hover" />
                    <Menu className="hand-hover desktop-hide" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar;