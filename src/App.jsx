import React from "react"
import { Route } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<DefaultLayout />}>
        
        </Route>
      </Routes>
    </>
  )
}

export default App
