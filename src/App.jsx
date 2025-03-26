import React from "react"
import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./components/layout/DefaultLayout"
import Homepage from "./pages/home/Homepage"

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<DefaultLayout />}>
        <Route index element={<Homepage/>} />

        </Route>
      </Routes>
    </>
  )
}

export default App
