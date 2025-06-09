import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDB6QhXyMrgiXFnEU8X-PAdszAonvyv52A",
  authDomain: "eventease-d.firebaseapp.com",
  projectId: "eventease-d",
  storageBucket: "eventease-d.firebasestorage.app",
  messagingSenderId: "758754660105",
  appId: "1:758754660105:web:b4970ee6e1a30508958dd8",
  measurementId: "G-J3G78TRM0M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
