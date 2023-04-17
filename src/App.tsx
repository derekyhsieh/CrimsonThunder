import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './app/userSlice';
import { auth, onAuthStateChanged } from '../services/firebase';

import { Switch, Text } from "@chakra-ui/react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/Auth.tsx/Login"
import Signup from "./pages/Auth.tsx/Signup"
import Home from './pages/Home/Home';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }))

        navigate("/")
      } else {

        dispatch(logout())
        navigate("/login")
      }
    })

  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Signup />} />
    </Routes>
  )
}

export default App
