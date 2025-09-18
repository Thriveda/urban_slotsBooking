
import './App.css'
import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from './components/HomePage'
import Services from './components/Services'
import AddProviderForm from './components/CreateServiceProvider'
import RegisterForm from './components/UserRegister'
import LoginPage from './components/LoginPage'
import ServiceProviderDetail from './components/ProvidersList'
import ServiceProviderBooking from './components/SlotBooking'
import ViewBookedSlots from './components/ViewBookedSlots'





function App() {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/serviceprovider/register" element={<AddProviderForm />} />
      <Route path="/services" element={<Services />} />
      <Route path='/:servicename' element={<ServiceProviderDetail />} />
      {/* <Route path='/serviceprovider/:id' element={<ServiceProviderBooking/>} > */}
      <Route path='/serviceprovider/:category/:id' element={<ServiceProviderBooking />} />
      <Route path='/viewbookings' element={<ViewBookedSlots />} />
    </Routes>
  
    

  )
}

export default App
