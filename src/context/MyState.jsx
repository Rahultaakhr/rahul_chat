import MyContext from "./MyContext";
import React, { useEffect, useReducer, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, fireDB } from "../firebase/firebaseConfig";

function MyState({ children }) {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            
        })
        
        return () => {
            unsub()
        }
    }, [currentUser,setCurrentUser])

    const initialState={
        chatId:"",
        user:{}
    }
    const chatReducer=(state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:currentUser.uid > action.payload.uId ? currentUser.uid + action.payload.uId : action.payload.uId + currentUser.uid
                };
                default:return state
        }
    }

    const [state,dispatch]=useReducer(chatReducer,initialState)

    return (
        <MyContext.Provider value={{ currentUser, setCurrentUser,data:state,dispatch }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState