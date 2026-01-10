import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    console.log("logging in");
    const payload = {
      method: "POST",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    };
    const response = await fetch(
      "http://localhost:3001/api/auth/login",
      payload
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(email, password);

    if(email.trim() === "" || password.trim() === ""){
      setErrorMessage('Fields must not be empty');
      return;
    };

    login();
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