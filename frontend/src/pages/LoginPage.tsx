import { useState, type FormEvent } from "react";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(email, password);

    if(email.trim() === "" || password.trim() === ""){
      console.log('fields must not be empty');
      return;
    };
  }

  return (
    <div className="hero-bg h-screen">
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
            <button className="my-button" type="submit">Sign In</button>
          </form>
          <p className="sign-in-option">Not a member? <a href="/signup" className="sign-in-link">Sign Up</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;