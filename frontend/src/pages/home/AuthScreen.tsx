import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from 'lucide-react';
import type { FormEvent } from "react";

function AuthScreen() {

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    navigate("/signup?email=" + email)
  };

  return (
    <div className="hero-bg">
      <div className="header">
        <div className="inner-header">
          <Link to="/" ><img className="logo" src="/netflix-logo.png" alt="logo" /></Link>
          <div className="sign-in-nav-link-container">
            <Link to="/login" className="sign-in-nav-link">Sign In</Link>
          </div>
        </div>
      </div>
      <div className="main auth-main auth-hero">
        <h1 className="title-auth">Unlimited movies, TV shows, and more.</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <form className="auth-form" onSubmit={function(e){handleSubmitForm(e)}}>
          <input 
            className="auth-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={function(e){setEmail(e.target.value)}}
          />
          <Link to='/login' className="get-started">Get Started <ChevronRight className="chevron-right"/></Link>
        </form>
      </div>

      <div className="seperator"></div>

      <div className="section">
        <div className="section-text">
          <h1 className="section-title">Enjoy on your TV</h1>
          <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
        </div>
        <div className="section-image">
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

      <div className="section reverse-column">
        <div className="section-image center">
          <img src="/stranger-things-lg.png" className="stranger-things-lg"/>
          <div className="downloading-box">
            <div className="downloading-box-one">
              <img src="/stranger-things-sm.png" />
              <div className="downloading-details">
                <p>Stranger Things</p>
                <p className="blue small">Downloading...</p>
              </div>
            </div>
            <div><img src='/download-icon.gif' alt='' className='h-12' /></div>
          </div>
        </div>
        <div className="section-text">
          <h1 className="section-title">Download your shows to watch offline</h1>
          <p>Save your favourites easily and always have something to watch.</p>
        </div>
      </div>
      <div className="seperator"></div>
      <div className="section">
        <div className="section-text">
          <h1 className="section-title">Watch everywhere</h1>
          <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
        </div>
        <div className="section-image">
          <img src="/device-pile.png" className="device-pile-image"/>
          <video
            className="device-pile-vid"
            playsInline
            autoPlay={true}
            muted
            loop
          >
            <source src="/video-devices.m4v" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="seperator"></div>

      <div className="section reverse-column">
        <div className="section-image center">
          <img src="/kids.png" />
        </div>
        <div className="section-text">
          <h1 className="section-title">Create profiles for kids</h1>
          <p>Send kids on adventures with their favourite characters in a space made just for them—free with your membership.</p>
        </div>
      </div>

      <div className="seperator"></div>

    </div>
  )
}

export default AuthScreen