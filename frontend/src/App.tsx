import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from './store/authUser'

import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Footer from './components/Footer'

function App() {

  const [loading, setLoading] = useState(true);

  const authStore = useAuthStore();
  const signedIn = authStore.signedIn;
  
  useEffect(()=>{
    authStore.checkAuth().finally(()=>{setLoading(false)});
  }, []);
  
  return (
    <>
      {
        loading?<div>Loading...</div>:
        <>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={!signedIn?<LoginPage />: <Navigate to="/" />} />
            <Route path='/signup' element={!signedIn?<SignUpPage />: <Navigate to="/" />} />
            <Route path='*' element={<HomePage />} />
          </Routes>
          <Footer />
        </>
      }
    </>
  )
}

export default App