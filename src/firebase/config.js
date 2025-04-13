// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { Timestamp } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0bJMSFi7py795E0tf-o_fIq3mXJH5hpI",
  authDomain: "myfinance-47c4d.firebaseapp.com",
  projectId: "myfinance-47c4d",
  storageBucket: "myfinance-47c4d.firebasestorage.app",
  messagingSenderId: "801671499822",
  appId: "1:801671499822:web:a5dfffd698cfe611c9cfbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// timestamp
const timestamp = Timestamp;

export { auth, db, storage, functions, timestamp }; // export the services and timestamp