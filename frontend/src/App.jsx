import React from 'react'

import NavBar from './components/layouts/NavBar'
import Footer from './components/layouts/Footer'
import About from './components/pages/About'
import Services from './components/pages/Services'
import Specialist from './components/pages/Specialist'
import Laboratories from './components/pages/Laboratories'
import Testimonials from './components/pages/Testimonials'
import Blog from './components/pages/Blog'
import Appointments from './components/pages/Appointments'
import Contacts from './components/pages/Contacts'


const App = () => {
  return (
    <>
      <NavBar />
      <About />
      <Services />
      <Specialist />
      {/* <Appointments /> */}
      <Laboratories/>
      <Testimonials/>
      <Blog/>
      <Contacts/>
      <Footer />
      
    </>

  )
}

export default App