import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import {Toaster} from 'react-hot-toast'
import UserContextProvider from "./context/UserContextProvider.jsx";
// components
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
function App() {
  axios.defaults.baseURL = "http://localhost:8080/api/user";
  axios.defaults.withCredentials = true;

  return (
    <>
    <UserContextProvider>
      <Toaster position="top-center" toastOptions={{duration: 3000}} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
