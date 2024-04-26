import React, { useState } from "react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, collection, onSnapshot, query, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../firebase/firebaseConfig";

function Login() {
    const navigate=useNavigate()
    console.log(import.meta.env.VITE_KEY);
    const [userLogin, setUserLogin] = useState(
        {
            email: '',
            password: "",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US",
                {
                    month: 'short',
                    day: "2-digit",
                    year: "numeric"
                })
        }
    )
    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === '') {

            toast.error("All Field are Required")
        }
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            navigate('/')
            const q = query(
                collection(fireDB, 'user'),
                where("uId", "==", users?.user?.uid)
            )
            const data = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => {
                    user = doc.data()
                })
                localStorage.setItem('user',JSON.stringify(user))
            })

            toast.success("Login Successfully")
            setUserLogin({
                email: "",
                password: ""
            })

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
                        <h3 className=" font-semibold text-[19px]"></h3>
                        <div className=" flex flex-col w-full px-2">
                            <input className="   p-5 outline-none bg-transparent w-full text-gray-50 placeholder:text-gray-200 border-b  mb-2 border-[#C4E4FF]" type="email" placeholder=" Enter Email"
                                value={userLogin.email}
                                onChange={(e) => {
                                    setUserLogin({ ...userLogin, email: e.target.value })
                                }}
                            />
                            <input className="   p-5 outline-none bg-transparent w-full text-gray-50 placeholder:text-gray-200 border-b  mb-2 border-[#C4E4FF]" type="password" placeholder=" Enter Password"
                                value={userLogin.password}
                                onChange={(e) => {
                                    setUserLogin({ ...userLogin, password: e.target.value })
                                }}
                            />

                        </div>
                        <button className=" bg-[#6D67E4] w-[80%] rounded-xl py-2 text-white font-semibold " onClick={userLoginFunction}>Login</button>
                        <p>Don't have an account? <Link className=" font-bold" to={"/signup"}>Signup</Link></p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login