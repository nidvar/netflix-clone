function HomeScreen() {

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
    </div>
  )
}

export default HomeScreen