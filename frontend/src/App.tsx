import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from './store/authUserStore'

import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Footer from './components/Footer'
import WatchPage from './pages/WatchPage'
import HomeScreen from './pages/home/HomeScreen'
import AuthScreen from './pages/home/AuthScreen'
import SearchResultsPage from './pages/SearchResultsPage'
import Navbar from './components/Navbar'

function App() {

  const [loading, setLoading] = useState(true);

  const authStore = useAuthStore();
  const signedIn = authStore.signedIn;
  
  useEffect(()=>{
    authStore.checkAuth().finally(()=>{setLoading(false)});
  }, []);
  
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>
        {
          loading?
          <div className="main hero-bg">
            <div className="sign-up-container">
              <p className="loading-message">Loading...</p>
            </div>
          </div>:
          <>
            {signedIn? <Navbar />: null}
            <Routes>
              <Route path='/' element={signedIn? <HomeScreen />: <AuthScreen />} />
              <Route path='/login' element={!signedIn?<LoginPage />: <Navigate to="/" />} />
              <Route path='/signup' element={!signedIn?<SignUpPage />: <Navigate to="/" />} />
              <Route path='/watch/:id' element={signedIn?<WatchPage />: <Navigate to="/login" />} />
              <Route path='/search' element={signedIn?<SearchResultsPage />: <Navigate to="/login" />} />
              <Route path='*' element={signedIn? <HomeScreen />: <AuthScreen />} />
            </Routes>
          </>
        }
      </div>
      <Footer />
    </div>
  )
}

export default App