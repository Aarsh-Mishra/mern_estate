import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import SignIn from './pages/Signin';
import About from './pages/about';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/sign-up' element = {<SignUp/>}/>
      <Route path='/sign-in' element = {<SignIn/>}/>
      <Route path='/Profile' element = {<Profile/>}/>
      <Route path='/about' element = {<About/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
