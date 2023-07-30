// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBV5hEUq78B8KnrWWDPcs_y3xbeV6LLqbQ",
    authDomain: "otp-verification-f02d8.firebaseapp.com",
    projectId: "otp-verification-f02d8",
    storageBucket: "otp-verification-f02d8.appspot.com",
    messagingSenderId: "399491993698",
    appId: "1:399491993698:web:379dda101cdd6b90a9013b",
    measurementId: "G-XN5XY9G84X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)