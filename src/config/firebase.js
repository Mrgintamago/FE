// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT6eI0QbADOD7agYAnSiD6R2KJgMOL0Mo",
  authDomain: "bottqn-5a13f.firebaseapp.com",
  projectId: "bottqn-5a13f",
  storageBucket: "bottqn-5a13f.firebasestorage.app",
  messagingSenderId: "169292954376",
  appId: "1:169292954376:web:5441116aeeb486d5b98abd",
  measurementId: "G-CHC2HL2NV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
