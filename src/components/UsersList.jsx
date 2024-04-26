import MyContext from "../context/MyContext";
import React, { useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../firebase/firebaseConfig";

function UsersList() {

    const {dispatch}=useContext(MyContext)
    const navigate=useNavigate()

    const [chat, setChat] = useState({})
    const {currentUser}=useContext(MyContext)
    useEffect(() => {

      
            const getChats=()=>{
                const unsub =onSnapshot(doc(fireDB,"userChat",currentUser.uid),(doc)=>{
                    setChat(doc.data())
                   
                })

                return ()=>{
                    unsub()
                }
            }
            currentUser.uid &&getChats()
      
    
    }, [currentUser.uid])
    const handleSelect =(u)=>{
        dispatch({type:"CHANGE_USER",payload:u})
    }
    
  return (
    <div className="  ">
        <div className=" scrollbar-track-transparent scrollbar-thumb-stone-50 scrollbartrack  scrollbar-none  overflow-y-scroll h-[495px]  ">
       
            {/* user list */}
            {Object.entries(chat).sort((a,b)=>b[1].date-a[1].date).map((userChat,index)=>{
                return(
                    
            <div key={index} className=" flex rounded-md mx-1 px-2 h-[60px] items-center bg-[#5f48c8] gap-2 my-1"
            onClick={()=>{
                handleSelect(userChat[1].userInfo)
                navigate('/chatsection')
                
            }}>
            <img className=" w-[50px] h-[50px] rounded-full" src={userChat[1].userInfo.photoURL} alt="" />
            <div className=" w-full">
                <h2 className=" w-fit font-semibold">{userChat[1].userInfo.displayName}</h2>
                <p className=" w-fit">{userChat[1].lastMessage?.text}</p>
            </div>
            </div>
                )
            })}
        
          



        </div>
         <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />

    </div>
  )
}

export default UsersList