import './App.css'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, seLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => seLoading(false))
  }, [])
  

  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between'>
    <div className='w-full-block'>
      <Header />
        <main>
          <Outlet />
        </main>
      <Footer />
    </div>
  </div> 
  ): null
}

export default App
