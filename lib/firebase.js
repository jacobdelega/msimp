// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "msimp-app.firebaseapp.com",
    projectId: "msimp-app",
    storageBucket: "msimp-app.appspot.com",
    messagingSenderId: "692390074175",
    appId: "1:692390074175:web:7f63ccca6d6772dee1e58a",
    measurementId: "G-1D5TSJK9SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};