function HomeScreen() {

  const logout = async () => {
    console.log("logging out");
    const payload = {
      method: "POST",
      credentials: "include" as RequestCredentials,
    };
    const response = await fetch(
      "http://localhost:3001/api/auth/logout",
      payload
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  const grabMovies = async () => {
    console.log("grabbing movies");
    const response = await fetch(
      "http://localhost:3001/api/movies/movie/trending",
      { credentials: "include" as RequestCredentials }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="temp-con">
      <h1>HOME SCREEN</h1><br />
      <button onClick={function(){grabMovies()}}>GRAB MOVIES</button><br />
      <button onClick={function(){logout()}}>LOGOUT</button>
    </div>
  )
}

export default HomeScreen