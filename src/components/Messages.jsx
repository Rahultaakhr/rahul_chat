import Message from "./Message";
import MyContext from "../context/MyContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReceivedMessage from "./ReceivedMessage";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { stringify } from "postcss";
import { fireDB } from "../firebase/firebaseConfig";

function Messages() {
  const messagesEndRef = useRef(null);
  const [chatData, setChatData] = useState([]);
  const { data, currentUser } = useContext(MyContext);

  useEffect(() => {
    if (data && data.chatId) {
      const unSub = onSnapshot(doc(fireDB, "chats", data.chatId), (docSnapshot) => {
        if (docSnapshot.exists()) {
          setChatData(docSnapshot.data().messages || []);
         
        } else {
          console.log("Document does not exist");
        }
      });

      return () => {
        unSub();
      };
    }
  }, [data]);

 useEffect( () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  },[chatData])

  return (
    <div className={`h-[71vh] md:bg-transparent  md:h-[66vh] overflow-y-scroll scrollbar-none px-2`}>
      {chatData.map((chat) => {
        if (chat.senderId === currentUser.uid) {
          return <Message key={chat.id} message={chat.text} media={chat.img} />;
        } else if (chat.senderId === data.user.uId) {
          return <ReceivedMessage key={chat.id} message={chat.text} media={chat.img}    />;
        }
        return null; // Add a default return statement to satisfy React's requirements
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
