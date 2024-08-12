// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsDwz0g-J1fUh9W3nvn44jqf8f2hK3B98",
  authDomain: "seren-3b2a3.firebaseapp.com",
  projectId: "seren-3b2a3",
  storageBucket: "seren-3b2a3.appspot.com",
  messagingSenderId: "868575462801",
  appId: "1:868575462801:web:2c97e2f5db55cb7530c630",
  measurementId: "G-8XELJW0JQ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};

const db = getFirestore(app);
// console.log( " data base"+ db );

// console.log("cahl eahi ha");
export {
  db,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  updateDoc,
};

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

export { storage, ref, getDownloadURL, uploadBytes };
