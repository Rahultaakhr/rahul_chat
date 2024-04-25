import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY ,
  authDomain: "chat-de397.firebaseapp.com",
  projectId: "chat-de397",
  storageBucket: "chat-de397.appspot.com",
  messagingSenderId: "251844151675",
  appId: "1:251844151675:web:ea1eb0c9000a3ded77d5de",
  measurementId: "G-H2FLTBK7FV"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const fireDB=getFirestore(app)
export{auth,fireDB,provider}

