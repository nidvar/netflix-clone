import HomePage from './pages/home/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Footer from './components/Footer'
import { useAuthStore } from './store/authUser'

function App() {
  const authStore = useAuthStore();
  const signedIn = authStore.signedIn;
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={signedIn?<SignUpPage />: <Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App