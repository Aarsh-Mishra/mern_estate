// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7b414.firebaseapp.com",
  projectId: "mern-estate-7b414",
  storageBucket: "mern-estate-7b414.firebasestorage.app",
  messagingSenderId: "1098399190047",
  appId: "1:1098399190047:web:48325a97c426af1769592a",
  measurementId: "G-452ZK1L0ZD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);