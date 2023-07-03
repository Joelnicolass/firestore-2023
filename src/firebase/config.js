import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCefA4SxTx5QVwoTyN6NUyRVg9MermM728",
  authDomain: "firestore-crud-8ed85.firebaseapp.com",
  projectId: "firestore-crud-8ed85",
  storageBucket: "firestore-crud-8ed85.appspot.com",
  messagingSenderId: "368075334068",
  appId: "1:368075334068:web:5c5e15d745f681ca0c92e1",
  measurementId: "G-78H2376DF0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
