// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2vHtlsjFYT720T7VVURg3lkbEz35aTtI",
  authDomain: "pantrytracker-4887b.firebaseapp.com",
  projectId: "pantrytracker-4887b",
  storageBucket: "pantrytracker-4887b.appspot.com",
  messagingSenderId: "882689754310",
  appId: "1:882689754310:web:6b61f801fdc993ed3543c7",
  measurementId: "G-7D5HP44TE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}