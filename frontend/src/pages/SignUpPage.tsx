import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(username, email, password, confirmPassword);

    if(username.trim() === "" || email.trim() === ""){
      console.log('fields must not be empty');
      return;
    };
    if(password.trim() !== confirmPassword.trim()){
      console.log('passwords do not match');
      return;
    };

  }

  return (
    <div className="hero-bg h-screen">
      <div className="header">
        <div className="inner-header">
          <Link to="/" ><img className="logo" src="/netflix-logo.png" alt="logo" /></Link>
        </div>
      </div>
      <div className="main">
        <div className="sign-up-container">
          <h1 className="title">Sign Up</h1>
          <form className="sign-up-form" onSubmit={function(e){handleSubmit(e)}}>
            <label htmlFor="username" className="my-label">Username</label>
            <input
              id="username"
              className="my-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={function(e){handleUsername(e.target.value)}}
            />
            <label htmlFor="email" className="my-label">Email</label>
            <input
              id="email"
              className="my-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={function(e){handleEmail(e.target.value)}}
            />
            <label htmlFor="password" className="my-label">Password</label>
            <input
              id="password"
              className="my-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={function(e){handlePassword(e.target.value)}}
            />
            <label htmlFor="confirm-password" className="my-label">Confirm Password</label>
            <input
              id="confirm-password"
              className="my-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={function(e){handleConfirmPassword(e.target.value)}}
            />
            <button className="my-button" type="submit">Sign Up</button>
          </form>
          <p className="sign-in-option">Already a member? <a href="/login" className="sign-in-link">Sign In</a></p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage