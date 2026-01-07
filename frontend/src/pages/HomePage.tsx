import { useState } from "react";
function HomePage() {
    const [count, setCount] = useState(0);

    const login = async () => {
        console.log("logging in");
        const payload = {
            method: "POST",
            credentials: "include" as RequestCredentials,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "bob@mail.com",
                password: "bob123",
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
        <>
            <div className="hero-bg h-screen">
                <h1 className="text-3xl font-bold underline bg-red-500">NETFLIX CLONE</h1>
                <button
                    className="my-button"
                    onClick={function () {
                        login();
                    }}
                >
                    BOB LOGIN
                </button>

                <button
                    className="my-button"
                    onClick={function () {
                        logout();
                    }}
                >
                    LOGOUT
                </button>

                <button
                    className="my-button"
                    onClick={function () {
                        grabMovies();
                    }}
                >
                    GRAB MOVIES
                </button>
            </div>
        </>
    );
}

export default HomePage;
