import MyContext from "../context/MyContext";
import React, { useContext, useState } from "react";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { fireDB } from "../firebase/firebaseConfig";

function Sender({ className = "" }) {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const { currentUser, data } = useContext(MyContext);

    const handleSend = async () => {
        if (text === "" && !img) return;

        if (img) {
            const storage = getStorage();
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                "state_changed",
                null,
                (error) => {
                    console.log(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateChat(downloadURL);
                }
            );
        } else {
            await updateChat();
        }

        setText("");
        setImg(null);
    };

    const updateChat = async (downloadURL) => {
        const message = {
            id: uuid(),
            text,
            img: downloadURL || null,
            senderId: currentUser.uid,
            date: Timestamp.now(),
        };

        await updateDoc(doc(fireDB, "chats", data.chatId), {
            messages: arrayUnion(message),
        });

        await updateDoc(doc(fireDB, "userChat", data.user.uId), {
            [`${data.chatId}.lastMessage`]: {
                text,
            },
            [`${data.chatId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(fireDB, "userChat", currentUser.uid), {
            [`${data.chatId}.lastMessage`]: {
                text,
            },
            [`${data.chatId}.date`]: serverTimestamp(),
        });
    };

    return (
        <div className={` flex items-center w-full bg-[#4e23ba] p-3 ${className}`}>
            <input
                className="flex-1 py-2 bg-transparent ps-4 outline-none border-b text-gray-100 placeholder:text-gray-200"
                type="text"
                placeholder="Write Something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center px-3 gap-4">
                <input
                    type="file"
                    className="hidden"
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file" className="font-bold text-gray-300 cursor-pointer">
                    <i className="fas fa-paperclip"></i>
                </label>
                <button
                    className="bg-slate-200 rounded-lg font-semibold px-4 py-2"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Sender;
