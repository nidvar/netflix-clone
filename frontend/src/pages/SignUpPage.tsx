function SignUpPage() {
  return (
    <div className="hero-bg h-screen">
      <div className="main">
        <div className="sign-up-container">
          <h1 className="title">Sign Up</h1>
          <form className="sign-up-form">

            <label htmlFor="email" className="my-label">Email</label>
            <input id="email" className="my-input" type="email" placeholder="Email" />

            <label htmlFor="password" className="my-label">Password</label>
            <input id="password" className="my-input" type="password" placeholder="Password" />

            <button className="my-button">Sign Up</button>
          </form>
          <p className="sign-in-option">Already a member? <a href="/login" className="sign-in-link">Sign In</a></p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage