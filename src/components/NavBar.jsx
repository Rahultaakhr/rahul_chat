import MyContext from "../context/MyContext";
import React , { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function NavBar({className}) {
  const {currentUser ,setCurrentUser}=useContext(MyContext)
  const logoutFunction=()=>{

    signOut(auth)
    console.log(currentUser);
  }
  useEffect(() => {

  }, [])
  
  return (
    <div className={``}>
        <div className=" flex justify-between items-center px-1 h-[60px] bg-[#1C1678]">
        <h1 className="logo font-bold text-white hidden sm:block">Rahul Chat</h1>
        <p className=" flex gap-1 text-gray-100 items-center">
        <img className=" w-[30px] h-[30px] rounded-full" src={currentUser.photoURL?currentUser.photoURL: "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"} alt="" />
            <span>{currentUser?.displayName?currentUser.displayName:'User'}</span>
        </p>
        <button className=" bg-[#372fa2] text-white px-3 py-2 rounded-xl shadow-lg absolute bottom-0" onClick={logoutFunction}>Logout</button>
        </div>

    </div>
  )
}

export default NavBar