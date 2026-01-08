import { Link } from "react-router-dom"

function AuthScreen() {
  return (
    <div className="hero-bg h-screen">
      <div className="header">
        <div className="inner-header">
          <img className="logo" src="/netflix-logo.png" alt="logo" />
          <div className="white">
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="sign-up-container">
          <h1 className="title">AUTH PAGE</h1>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen