import MyContext from "../context/MyContext";
import React, { useContext } from "react";

function ChatNavBar() {

    const {data}=useContext(MyContext)
    console.log(data.user);
    return (
        <div>
            <div className=" flex items-center  p-[10px] h-[60px] bg-[#5c2dc1]">
                <div className="flex items-center gap-2">
                    <img className=" w-[46px] h-[45px] rounded-full" src= {data?.user?.photoURL? data.user.photoURL:"https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg"} alt="" />
                    <h2 className=" font-semibold text-[20px]">{data.user?.displayName}</h2>
                </div>
            </div>
        </div>
    )
}

export default ChatNavBar