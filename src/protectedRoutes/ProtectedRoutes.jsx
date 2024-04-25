import MyContext from "../context/MyContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const { currentUser } = useContext(MyContext)
    // const user=localStorage.getItem("user")
  
    const navigate = useNavigate()
    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
       
    }, [currentUser, navigate])
    return currentUser ? children : null

}

export default ProtectedRoutes