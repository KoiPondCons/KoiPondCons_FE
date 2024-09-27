// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3Wp-8chn_Xt5I0g55KM3IvgRPC3TMGsU",
  authDomain: "koi-pond-cons.firebaseapp.com",
  projectId: "koi-pond-cons",
  storageBucket: "koi-pond-cons.appspot.com",
  messagingSenderId: "514181138154",
  appId: "1:514181138154:web:507e560300582207033993",
  measurementId: "G-H567LV6612"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { storage, googleProvider};