import { useState, type FormEvent, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/authUser";

function SignUpPage() {

  const location = useLocation();
  const urlEmail = new URLSearchParams(location.search).get('email');

  const authStore = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(username.trim() === "" || email.trim() === ""){
      setErrorMessage('Fields must not be empty');
      return;
    };
    if(password.trim() !== confirmPassword.trim()){
      setErrorMessage('Passwords do not match');
      return;
    };

    const response = await authStore.signUp(email, username, password);

    if(response === 'User created successfully'){
      setResult('User created successfully');
    }else{
      setErrorMessage(response);
    };

  };

  useEffect(()=>{
    if(urlEmail !== null){
      setEmail(urlEmail);
    }
  }, [urlEmail]);

  return (
    <div className="hero-bg h-screen">
      <div className="header">
        <div className="inner-header">
          <Link to="/" ><img className="logo" src="/netflix-logo.png" alt="logo" /></Link>
        </div>
      </div>
      <div className="main">
        <div className="sign-up-container">
          {result === 'User created successfully'? 
            <>
              <p>Account created successfully</p>
              <Link to="/login" className="sign-in-nav-link">Sign In</Link>
            </>:
            <>
              {
                authStore.isLoading? <p className="loading-message">Creating Account...</p>: 
                <>
                  <h1 className="title">Sign Up</h1>
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
                    <label htmlFor="username" className="my-label">Username</label>
                    <input
                      id="username"
                      className="my-input"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e)=>{setUsername(e.target.value)}}
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
                    <label htmlFor="confirm-password" className="my-label">Confirm Password</label>
                    <input
                      id="confirm-password"
                      className="my-input"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />
                    <button className="my-button" type="submit">Sign Up</button>
                  </form>
                  <p className="red">{errorMessage}</p>
                  <p className="sign-in-option">Already a member? <Link to="/login" className="sign-in-link">Sign In</Link></p>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default SignUpPage