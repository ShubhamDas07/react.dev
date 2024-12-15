// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRznvX8RKvoP6O4Hshv7ngyGDPHR4rxtw",
  authDomain: "bytive-c1ba5.firebaseapp.com",
  projectId: "bytive-c1ba5",
  storageBucket: "bytive-c1ba5.firebasestorage.app",
  messagingSenderId: "826349707303",
  appId: "1:826349707303:web:cd6cda6ec58c0154756e02",
  measurementId: "G-MPXDRWK1TY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
