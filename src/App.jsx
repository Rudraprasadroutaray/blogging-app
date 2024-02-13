import React, { useState,useEffect } from 'react'

import { useDispatch } from 'react-redux' 
import authService from './appWrite/auth'
import {login,logout} from "./Store/authSlice"
import './App.css'
import { Footer,Header } from './Components'
import { Outlet } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()


  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap 
  content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
      {/* ///handale it */}
       TODO: <Outlet/>
      </main>
      <Footer/>
      
    </div>
  </div>
  ) :null
}

export default App
