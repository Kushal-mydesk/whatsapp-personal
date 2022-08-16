import firebase from "firebase";
import { initializeApp } from "firebase/app";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9VNDAjBse9HxMvHlgs6m_O81KuUqN850",
  authDomain: "whatsapp-2-56004.firebaseapp.com",
  projectId: "whatsapp-2-56004",
  storageBucket: "whatsapp-2-56004.appspot.com",
  messagingSenderId: "265083863060",
  appId: "1:265083863060:web:1d2986c1f4db758052a701",
  measurementId: "G-MR239D2WSX"
};

// Initialize Firebase

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app();



const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {db,auth,provider};
