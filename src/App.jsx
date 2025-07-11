import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import HomePage from './pages/HomePage'
import MySeshPage from './pages/MySeshPage'
import SeshCenterPage from './pages/SeshCenterPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/mysesh' element={<MySeshPage />} />
      <Route path='/seshcenter' element={<SeshCenterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
    
    </>
  )
}

export default App
