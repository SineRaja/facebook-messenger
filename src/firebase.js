import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC6XomnIkIxD2c7jYVbqR5WBdeua19LbDE",
    authDomain: "facebook-chat-7a950.firebaseapp.com",
    projectId: "facebook-chat-7a950",
    storageBucket: "facebook-chat-7a950.appspot.com",
    messagingSenderId: "92147644100",
    appId: "1:92147644100:web:406d4fad8624e19918bb91",
    measurementId: "G-L4C04SJSJJ"

});

const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp)

export {auth}
export default db;