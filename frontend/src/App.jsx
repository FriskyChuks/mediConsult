import {BrowserRouter, Routes, Route} from "react-router-dom"

import NavBar from './components/layouts/NavBar'
import About from './components/pages/About'
import Services from './components/pages/Services'
import Footer from './components/layouts/Footer'
import Categories from './components/pages/Categories'
import Contacts from "./components/pages/Contacts"
import Home from './components/pages/Home'
import RegisterForm from './components/auth/RegisterForm'
import LoginForm from './components/auth/LoginForm'
import Profile from './components/auth/Profile'
import PlaceOrder from './components/orders/PlaceOrder'
import Items from './components/orders/Orders'
import Orders from './components/orders/Orders'

import { SearchProvider } from './components/contexts/SearchContext'
import SearchResults from "./components/contexts/SearchResults"
import UserContext from "./components/contexts/UserContext"


const App = () => {
  const baseURL = 'http://localhost:8000'

  return (
    <SearchProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/search" element={<SearchResults baseURL={baseURL} />} />
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/contact" element={<Contacts/>}/>
          <Route path="/register" element={<RegisterForm baseURL={baseURL} />}/>
          <Route path="/login" element={<LoginForm baseURL={baseURL} />}/>
          <Route path="/auth/profile" element={<Profile baseURL={baseURL} />}/>
          <Route path="/orders/place_order" element={<PlaceOrder baseURL={baseURL} />}/>
          <Route path="/orders/orders" element={<Orders baseURL={baseURL} />}/>
          <Route path="/items" element={<Items baseURL={baseURL} />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App