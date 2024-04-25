import MyContext from "../context/MyContext";
import React, { useContext, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

function Message({message,media}) {

    const {currentUser,data}=useContext(MyContext)
    const ref=useRef()

   
    useEffect(()=>{
        ref.current?.scrollIntoView({ behavior: "smooth" });
    
      },[Message])
    return (
        <div>
            {/* text message */}
            <div className=" w-full h-[auto] py-1  mb-2 flex items-center gap-5 justify-end">
                
                <div className=" w-full max-w-[50%] p-3 bg-white rounded-tr-xl rounded-tl-xl rounded-bl-xl">
                    <p>{message}</p>
                    {media ? <img className=" " src={media} alt="" />:null}

                </div>
                <div className=" flex flex-col items-center">
                    <img className=" w-[46px] h-[45px] rounded-full" src={currentUser?.photoURL} alt="" />
                    <p>Just now</p>
                </div>

            </div>

            {/* Photo message */}
            {/* <div className=" w-full h-[auto] py-1  mb-2 flex items-center gap-5">
                <div className=" flex flex-col items-center">
                    <img className=" w-[46px] h-[45px] rounded-full" src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg" alt="" />
                    <p>Just now</p>
                </div>
                <div className=" w-full max-w-[50%] p-3 bg-white rounded-tr-xl rounded-br-xl rounded-bl-xl">
                    <p>
                        <img className=" " src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg" alt="" />

                    </p>

                </div>

            </div> */}
        </div>
    )
}

export default Message


