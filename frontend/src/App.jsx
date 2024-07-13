import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import NavBar from './components/layouts/NavBar'
import About from './components/pages/About'
import Services from './components/pages/Services'
import Footer from './components/layouts/Footer'
import Categories from './components/pages/Categories'
import Home from './components/pages/Home'
import RegisterForm from './components/auth/RegisterForm'
import LoginForm from './components/auth/LoginForm'

const App = () => {
  const baseURL = 'http://localhost:8000'

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/register" element={<RegisterForm baseURL={baseURL} />}/>
        <Route path="/login" element={<LoginForm baseURL={baseURL} />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App