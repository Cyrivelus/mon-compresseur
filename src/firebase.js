// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA75biVHAo263OoTC50q8Og4vgsycUWyzs",
  authDomain: "mon-compresseur.firebaseapp.com",
  projectId: "mon-compresseur",
  storageBucket: "mon-compresseur.firebasestorage.app",
  messagingSenderId: "381664774944",
  appId: "1:381664774944:web:45cb59f4396ceee8772545",
  measurementId: "G-P653W2MQLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);