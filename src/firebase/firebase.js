import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW6CwG7dCR59bAWdptHfTPixNKSjThf4k",
  authDomain: "eventease-a8056.firebaseapp.com",
  projectId: "eventease-a8056",
  storageBucket: "eventease-a8056.firebasestorage.app",
  messagingSenderId: "833355779835",
  appId: "1:833355779835:web:7f976e74b0eb23c8beaa5e",
  measurementId: "G-XWFX8W2NGF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
