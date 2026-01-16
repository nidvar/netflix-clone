export const grabMovies = async () => {
    console.log("grabbing movies");
    const response = await fetch(
        "http://localhost:3001/api/movies/movie/trending",
        { credentials: "include" as RequestCredentials }
    );
    const data = await response.json();
};