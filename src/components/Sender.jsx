import MyContext from "../context/MyContext";
import React, { useContext, useId, useState } from "react";
import { data } from "autoprefixer";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { fireDB } from "../firebase/firebaseConfig";

function Sender({
    className = ''
}) {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)
    const {currentUser,data}=useContext(MyContext)
    const id =useId()


    const handleSend = async () => {

        if (text==='' && !img) return



        if (img) {
            const storage = getStorage();
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on("state_changed",
                null,

                (error) => {
                    console.log(error);
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(fireDB,"chats",data.chatId),{
                            messages:arrayUnion({
                                id:uuid(),
                                text,
                                img:downloadURL,
                                senderId:currentUser.uid,
                                date:Timestamp.now()
                
                            })
                        })
                        

                        })
                    
                }
            );
        }

    else{
        await updateDoc(doc(fireDB,"chats",data.chatId),{
            messages:arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now()

            })
        })

        await updateDoc(doc(fireDB, "userChat", data.user.uId), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()


        })
        await updateDoc(doc(fireDB, "userChat", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()


        })
    }
    
        setText("")
        setImg(null)

    }
    return (
        <div>
            <div className={` w-full  flex bg-[#4e23ba] items-center  p-[10px] ${className}`}>
                <input className=" py-2 bg-transparent ps-4 outline-none border-b  text-gray-100 placeholder:text-gray-200  flex-1" type="text" placeholder="Write Something..."
                    onChange={(e) => {
                        
                        setText(e.target.value)
                    }}
                    value={text}
                />

                <div className=" flex items-center px-3 gap-4 ">
                    <input type="file" className=" hidden" name="" id="file" 
                    onChange={(e)=>{
                        setImg(e.target.files[0])
                    }}/>
                    <label htmlFor="file" className=" font-bold text-[22px] text-gray-300">
                        <i className="fa-solid fa-paperclip"></i>
                    </label>

                    <button className=" bg-slate-200 rounded-lg font-semibold h-full px-4 py-2" 
                    onClick={handleSend}>send</button>
                </div>

            </div>
        </div>
    )
}

export default Sender