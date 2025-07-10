// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4fnQwgZ3rDVJU5AO7xAgAyG6aNgIGUfo",
    authDomain: "simple-k-firebase.firebaseapp.com",
    projectId: "simple-k-firebase",
    storageBucket: "simple-k-firebase.firebasestorage.app",
    messagingSenderId: "381648517909",
    appId: "1:381648517909:web:89779e8e664602a162471c",
    measurementId: "G-H0LHFYZMLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);