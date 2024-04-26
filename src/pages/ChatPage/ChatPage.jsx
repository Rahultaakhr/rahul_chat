import ChatSection from "../../components/ChatSection";
import React from "react";
import SideBar from "../../components/SideBar";

function ChatPage() {
    return (
        <div className=" w-full h-screen overflow-hidden bg-[#8579de]">
            <div className=" flex justify-center items-center w-full h-screen">
                <div className=" overflow-hidden  flex border border-black w-[1080px] rounded-xl h-[600px]">

                    <div className="w-[40%] border border-black h-full">
                        <SideBar/>
                    </div>
                    <div className=" w-[65%] sm:w-full border border-black h-full">
                        <ChatSection/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChatPage