import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authUser";

import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

function HomePage() {

  const authStore = useAuthStore();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(()=>{
    authStore.signedIn === true? setSignedIn(true): setSignedIn(false);
  }, [authStore.signedIn]);

  return (
    <div className="hero-bg">
      {signedIn? <HomeScreen />: <AuthScreen />}
    </div>
  );
}

export default HomePage;
