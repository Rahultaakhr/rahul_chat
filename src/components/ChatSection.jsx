import ChatNavBar from "./ChatNavBar";
import Messages from "./Messages";
import React from "react";
import Sender from "./Sender";

function ChatSection() {
  return (
    <div className=" h-full">
        <ChatNavBar/>
        <Messages/>
        <Sender className=" h-[60px]" />
    </div>
  )
}

export default ChatSection