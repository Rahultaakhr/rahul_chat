import MyContext from "../context/MyContext";
import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

function SearchBar() {
  const { currentUser } = useContext(MyContext)
  


  const [user, setUser] = useState({})
  const [username, setUsername] = useState("")
  const handleSearch = () => {

    try {
      const q = query(
        collection(fireDB, "user"),
        where("displayName", "==", username)
      )
      const data = onSnapshot(q, (QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          setUser(doc.data())
          // console.log(doc.data());
         
        })

      })
      return data

    } catch (error) {
      console.log(error);
    }

  }

  const handleSelecte = async () => {
    // console.log(currentUser.uid);
    // console.log(user);
    const combinedId = currentUser.uid > user.uId ? currentUser.uid + user.uId : user.uId + currentUser.uid
    try {
     const res= await getDoc(doc(fireDB,"chats",combinedId))
      if (!res.exists()) {
        await setDoc(doc(fireDB,"chats",combinedId),{message:[]})
        
        await updateDoc(doc(fireDB,"userChat",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uId:user.uId,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })

        await updateDoc(doc(fireDB,"userChat",user.uId),{
          [combinedId+".userInfo"]:{
            uId:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
      }

    } catch (error) {
      
      console.log(error);
    }
    setUsername("")
    setUser(null)

  }
  useEffect(() => {
    
  setUser(null)
  }, [])


  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }
  //     <div className=" absolute h-[300px] w-full bg-black overflow-y-scroll scroll-smooth scrollbar-none  ">
  //     {/* user list */}
  //     <div className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
  //   <img className=" w-[40px] h-[40px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
  //   <div className=" w-full">
  //       <h2 className=" w-fit font-semibold">Rahul</h2>
  //       <p className=" w-fit">Hello</p>
  //   </div>
  //   </div>
  //     {/* user list */}
  //     <div className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
  //   <img className=" w-[40px] h-[40px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
  //   <div className=" w-full">
  //       <h2 className=" w-fit font-semibold">Rahul</h2>
  //       <p className=" w-fit">Hello</p>
  //   </div>
  //   </div>
  //     {/* user list */}
  //     <div className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
  //   <img className=" w-[40px] h-[40px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
  //   <div className=" w-full">
  //       <h2 className=" w-fit font-semibold">Rahul</h2>
  //       <p className=" w-fit">Hello</p>
  //   </div>
  //   </div>
  //     {/* user list */}
  //     <div className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
  //   <img className=" w-[40px] h-[40px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
  //   <div className=" w-full">
  //       <h2 className=" w-fit font-semibold">Rahul</h2>
  //       <p className=" w-fit">Hello</p>
  //   </div>
  //   </div>
  //     {/* user list */}
  //     <div className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
  //   <img className=" w-[40px] h-[40px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
  //   <div className=" w-full">
  //       <h2 className=" w-fit font-semibold">Rahul</h2>
  //       <p className=" w-fit">Hello</p>
  //   </div>
  //   </div>
  //     {/* user list */}
  //     <div className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
  //   <img className=" w-[40px] h-[40px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
  //   <div className=" w-full">
  //       <h2 className=" w-fit font-semibold">Rahul</h2>
  //       <p className=" w-fit">Hello</p>
  //   </div>
  //   </div>
  //     {/* user list */}
  //     <div className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
  //   <img className=" w-[40px] h-[40px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
  //   <div className=" w-full">
  //       <h2 className=" w-fit font-semibold">Rahul</h2>
  //       <p className=" w-fit">Hello</p>
  //   </div>
  //   </div>
  // </div>
  return (
    <div className=" relative w-full h-full">

      <div>
        <input onKeyDown={handleKey}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)

          }} className=" py-2 border-b border-gray-50 w-full bg-[#1b1856] outline-none text-gray-200 placeholder:text-gray-50" type="text" placeholder="Search..." />
      </div>
      {/* user list */}
      {
        user && <div className=" py-2 bg-white w-full h-auto">
          <div onClick={() => {
            handleSelecte()
          }} className=" flex rounded-md mx-1 px-2 items-center bg-[#5f48c8] gap-2 my-1">
            <img className=" w-[40px] h-[40px] rounded-full" src={user?.photoURL} alt="" />
            <div className=" w-full">
              <h2 className=" w-fit font-semibold">{user?.displayName}</h2>
              <p className=" w-fit">Hello</p>
            </div>
          </div>
        </div> 

      }




    </div>
  )
}

export default SearchBar