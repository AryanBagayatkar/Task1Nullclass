import React from 'react'
import Sign from './Sign'
import { Routes , BrowserRouter , Route }from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Forgot from './Forgot'

const App = () => {
  return (
  <> 
  <h1>Hello</h1>
  <a href="/register">Register</a>
  <a href="/login">login</a>
   <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Sign/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/forgot' element={<Forgot/>}></Route>
      </Routes>
   </BrowserRouter>
   </>  
  )
}

export default App
