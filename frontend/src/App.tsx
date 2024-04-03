import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/login"
import Navbar from "./components/navbar"
import Update from "./pages/update"
import ProfilePage from "./pages/profile"
import UserList from "./pages/UserList"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/update" element={<Update />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/user/all" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
