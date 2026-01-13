import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authUser";

function LoginPage() {

  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(email.trim() === "" || password.trim() === ""){
      setErrorMessage('Fields must not be empty');
      return;
    };

    const result = await authStore.login(email, password);
    if(result === 'Login successful'){
      navigate("/");
    }else{
      setErrorMessage(result);
    }
  }

  return (
    <div className="hero-bg">
      <div className="header">
        <div className="inner-header">
          <Link to="/" ><img className="logo" src="/netflix-logo.png" alt="logo" /></Link>
        </div>
      </div>
      <div className="main">
        <div className="sign-up-container">
          <h1 className="title">Sign In</h1>
          <form className="sign-up-form" onSubmit={function(e){handleSubmit(e)}}>
            <label htmlFor="email" className="my-label">Email</label>
            <input
              id="email"
              className="my-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label htmlFor="password" className="my-label">Password</label>
            <input
              id="password"
              className="my-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button className="my-button" type="submit">Sign In</button>
          </form>
          <p className="red">{errorMessage}</p>
          <p className="sign-in-option">Not a member? <a href="/signup" className="sign-in-link">Sign Up</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;