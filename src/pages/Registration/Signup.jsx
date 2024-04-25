import MyContext from "../../context/MyContext";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../firebase/firebaseConfig";

function Signup() {
    const navigate = useNavigate()
    const { currentUser } = useContext(MyContext)
    console.log(currentUser);

    const [userSignup, setUserSignup] = useState(
        {
            name: '',
            email: "",
            password: '',
            file: "",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
            )
        }
    )
    const userSignupFunction = async () => {
        if (userSignup.name === '' || userSignup.email === "" || userSignup.password === '') {

            toast.error("All Field are Required")
        }
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password)
            console.log(users);
            console.log(users.user);





            const storage = getStorage();
            const storageRef = ref(storage, userSignup.name);

            const uploadTask = uploadBytesResumable(storageRef, userSignup.file);

            uploadTask.on("state_changed",
                null,

                (error) => {
                    console.log(error);
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(
                            users.user, {
                            displayName: userSignup.name,
                            photoURL: downloadURL
                        }
                        )
                        const user = {
                            name: userSignup.name,
                            email: userSignup.email,
                            uId: users.user.uid,
                            file: downloadURL,
                            time: Timestamp.now(),
                            date: new Date().toLocaleString(
                                "en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric"
                            }
                            )

                        }
                        // const userRef = collection(fireDB, "user")
                        await setDoc(doc(fireDB,"user",user.uId),{
                            displayName:user.name,
                            email:user.email,
                            photoURL:downloadURL,
                            uId:user.uId

                        })
                        await setDoc(doc(fireDB,"userChat",user.uId),{
                           

                        })

                    });
                }
            );
            toast.success("Signup Successfully")


            setUserSignup({
                name: "",
                email: "",
                file: "",
                password: ""
            })

            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className=" bg-[#A099FF] w-full h-screen">
                <div className=" flex justify-center items-center h-screen">

                    <div className=" flex  items-center flex-col py-3   border border-black w-[400px] h-[auto]  rounded-xl">
                        <h1 className=" font-bold text-[22px] border-b-4  mb-2">Rahul Chat </h1>
                        <h3 className=" font-semibold text-[19px]">Sign Up</h3>
                        <div className=" flex flex-col w-full px-2">
                            <input className="   p-5 outline-none bg-transparent w-full text-gray-50 placeholder:text-gray-200 border-b  border-[#C4E4FF]" type="text" placeholder=" Enter Name"

                                value={userSignup.name}
                                onChange={(e) => {
                                    setUserSignup({ ...userSignup, name: e.target.value })
                                }}
                            />

                            <input className="   p-5 outline-none bg-transparent w-full text-gray-50 placeholder:text-gray-200 border-b  border-[#C4E4FF]" type="email" placeholder=" Enter Email"
                                value={userSignup.email}
                                onChange={(e) => {
                                    setUserSignup({ ...userSignup, email: e.target.value })
                                }}
                            />

                            <input className="   p-5 outline-none bg-transparent w-full text-gray-50 placeholder:text-gray-200 border-b  border-[#C4E4FF]" type="password" placeholder=" Enter Password"
                                value={userSignup.password}
                                onChange={(e) => {
                                    setUserSignup({ ...userSignup, password: e.target.value })
                                }} />

                            <input type="file" id="file" className=" hidden"

                                onChange={(e) => {
                                    setUserSignup({ ...userSignup, file: e.target.files[0] })
                                }} />

                            <label htmlFor="file" className=" flex items-center gap-8 p-3 ">
                                <img className=" w-[44px] h-[44px]" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" alt="" />
                                <span className=" font-medium text-[18px]">Avatar</span>
                            </label>
                        </div>
                        <button className=" bg-[#6D67E4] w-[80%] rounded-xl py-2 text-white font-semibold " onClick={userSignupFunction}>Signup</button>
                        <p>Have an account? <Link className=" font-bold" to={"/login"}>Login</Link></p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup