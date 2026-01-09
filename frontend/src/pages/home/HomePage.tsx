import { useState } from "react";

import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { Link } from "react-router-dom";

function HomePage() {

  // const [user, setUser] = useState(false);

  const user = false;

  return (
    <div className="hero-bg">
      {user? <HomeScreen />: <AuthScreen />}
    </div>
  );
}

export default HomePage;
