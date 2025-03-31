
import React from "react"
import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./components/layout/DefaultLayout"
import Homepage from "./pages/home/Homepage"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import ForgetPassword from "./pages/auth/ForgetPassword"

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
        </Route>
        {/* private routes */}
        <Route>
            {/* please add private routes (todo) */}
        </Route>
      </Routes>
    </>
  )
}

export default App;
