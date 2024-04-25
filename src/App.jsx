import Home from "./pages/Home/Home";
import Login from "./pages/Registration/Login";
import MyContext from "./context/MyContext";
import MyState from "./context/MyState";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Signup from "./pages/Registration/Signup";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";

import {
  BrowserRouter, Routes, Route
} from "react-router-dom";

function App() {



  return (
    <>
      
      <MyState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoutes>
              <Home />
            </ProtectedRoutes>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </MyState>
       
    </>
  )
}

export default App
