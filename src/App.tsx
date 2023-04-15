import { Switch, Text } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth.tsx/Login"
import Signup from "./pages/Auth.tsx/Signup"

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>hello world</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Signup />} />
    </Routes>
  )
}

export default App
