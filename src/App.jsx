import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex flex-col'>
      <Navbar/>
    </div>
    </>
  )
}

export default App
