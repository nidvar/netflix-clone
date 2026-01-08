import { Link } from "react-router-dom";
import { ChevronRight } from 'lucide-react';

function AuthScreen() {
  return (
    <div className="hero-bg h-screen">
      <div className="header">
        <div className="inner-header">
          <img className="logo" src="/netflix-logo.png" alt="logo" />
          <div className="sign-in-nav-link-container">
            <Link to="/login" className="sign-in-nav-link">Sign In</Link>
          </div>
        </div>
      </div>
      <div className="main auth-hero">
        <h1 className="title-auth">Unlimited movies, TV shows, and more.</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <form className="auth-form">
          <input 
            className="auth-input"
            type="email"
            placeholder="Email address"
            onChange={function(){}}
          />
          <button className="get-started">Get Started <ChevronRight className="chevron-right"/></button>
        </form>
      </div>

      <div className="seperator"></div>

      <div className="section">
        <div className="one">
          <h1 className="section-title">Enjoy on your TV</h1>
          <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
        </div>
        <div className="two">
          <img src="/tv.png" className="tv-image"/>
          <video
            className="hero-vid"
            playsInline
            autoPlay={true}
            muted
            loop
          >
            <source src="/hero-vid.m4v" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="seperator"></div>

    </div>
  )
}

export default AuthScreen