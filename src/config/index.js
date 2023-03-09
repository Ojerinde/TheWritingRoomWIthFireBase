// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCQCuumm6ozpxH5XlfxWTpPN_iCYbE9m4",
  authDomain: "thewritingroom-6f215.firebaseapp.com",
  projectId: "thewritingroom-6f215",
  storageBucket: "thewritingroom-6f215.appspot.com",
  messagingSenderId: "1048482722713",
  appId: "1:1048482722713:web:4394ca5b17a54df2ab1908",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
