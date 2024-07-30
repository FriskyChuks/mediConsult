import {BrowserRouter, Routes, Route} from "react-router-dom"

import NavBar from './components/layouts/NavBar'
import About from './components/pages/About'
import Services from './components/pages/Services'
import Footer from './components/layouts/Footer'
import Store from './components/pages/Store'
import Contacts from "./components/pages/Contacts"
import Home from './components/pages/Home'
import RegisterForm from './components/auth/RegisterForm'
import ActivationPage from "./components/auth/ActivationPage"
import ResendActivation from "./components/auth/ResendActivation"
import ResetPassword from "./components/auth/ResetPassword"
import LoginForm from './components/auth/LoginForm'
import Profile from './components/auth/Profile'
import PlaceOrder from './components/orders/PlaceOrder'
import Items from './components/orders/Orders'
import Orders from './components/orders/Orders'
import Cart from "./components/orders/carts/Cart"
import ItemDetail from "./components/items/ItemDetail"

import { SearchProvider } from './components/contexts/SearchContext'
import SearchResults from "./components/contexts/SearchResults"
import CartContextProvider from "./components/contexts/CartContextProvider"


const App = () => {
  const baseURL = 'http://localhost:8000'

  return (
    <CartContextProvider>
      <SearchProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/search" element={<SearchResults baseURL={baseURL} />} />
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/contact" element={<Contacts/>}/>
          <Route path="/register" element={<RegisterForm baseURL={baseURL} />}/>
          <Route path="/auth/activate/:uid/:token" element={<ActivationPage baseURL={baseURL} />}/>
          <Route path="/login" element={<LoginForm baseURL={baseURL} />}/>
          <Route path="/auth/resend_activation" element={<ResendActivation baseURL={baseURL} />}/>
          <Route path="/auth/reset_password" element={<ResetPassword baseURL={baseURL} />}/>
          <Route path="/auth/profile" element={<Profile baseURL={baseURL} />}/>
          <Route path="/orders/place_order" element={<PlaceOrder baseURL={baseURL} />}/>
          <Route path="/orders/orders" element={<Orders baseURL={baseURL} />}/>
          <Route path="/orders/cart" element={<Cart baseURL={baseURL} />}/>
          <Route path="/items" element={<Items baseURL={baseURL} />} />
          <Route path="/item_detail/:id" element={<ItemDetail baseURL={baseURL} />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </SearchProvider>
    </CartContextProvider>
  )
}

export default App