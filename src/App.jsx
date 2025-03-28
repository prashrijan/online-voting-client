
import React from "react"
import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./components/layout/DefaultLayout"
import Homepage from "./pages/home/Homepage"
import Register from "./pages/account/Register"
import Login from "./pages/account/Login"
import ForgetPassword from "./pages/account/ForgetPassword"
import Contact from "./pages/Contact"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
