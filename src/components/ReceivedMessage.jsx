import MyContext from "../context/MyContext";
import React, { useCallback, useContext } from "react";

function ReceivedMessage({message,media}) {
    const {data}=useContext(MyContext)
    return (
        <div>
            {/* text message */}
            <div className=" w-full h-[auto] py-1  mb-2 flex items-center gap-5 ">
                <div className=" flex flex-col items-center">
                    <img className=" w-[46px] h-[45px] rounded-full" src={data?.user?.photoURL} alt="" />
                    <p>Just now</p>
                </div>
                <div className=" w-full max-w-[50%] p-3 bg-white rounded-tr-xl rounded-br-xl rounded-bl-xl">
             <p>{message}</p>
             {media &&    <img className=" " src={media} alt="" /> }

                </div>

            </div>

            {/* Photo message */}
            {/* <div className=" w-full h-[auto] py-1  mb-2 flex items-center gap-5">
                <div className=" flex flex-col items-center">
                    <img className=" w-[46px] h-[45px] rounded-full" src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg" alt="" />
                    <p>Just now</p>
                </div>
                <div className=" w-full max-w-[50%] p-3 bg-white rounded-tr-xl rounded-br-xl rounded-bl-xl">
                    <p>
                        <img className=" " src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg" alt="" />

                    </p>

                </div>

            </div> */}
        </div>
    )
}

export default ReceivedMessage