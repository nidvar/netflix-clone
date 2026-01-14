import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authUser";

import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

function HomePage() {

  const authStore = useAuthStore();
  const signedIn = authStore.signedIn;

  useEffect(()=>{
    authStore.checkAuth();
  }, []);

  return (
    <div className="hero-bg">
      {signedIn? <HomeScreen />: <AuthScreen />}
    </div>
  );
}

export default HomePage;
