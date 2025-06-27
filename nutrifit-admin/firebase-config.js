// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD38v7aPxM-yO2_uoFIYF1DIVj_3SjlQrk",
  authDomain: "nutrifit-d98f5.firebaseapp.com",
  projectId: "nutrifit-d98f5",
  storageBucket: "nutrifit-d98f5.firebasestorage.app",
  messagingSenderId: "443385573457",
  appId: "1:443385573457:web:a81c4a80df6d5251af8870"
};




const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)
export { db, storage,auth}

