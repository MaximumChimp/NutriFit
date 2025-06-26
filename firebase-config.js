// src/firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDdK8gaeVdAMv44O_a5smZ6X_DrlFQkhhc",
  authDomain: "savings-tracker-f7b83.firebaseapp.com",
  projectId: "savings-tracker-f7b83",
  storageBucket: "savings-tracker-f7b83.appspot.com", // ✅ corrected here
  messagingSenderId: "767187090185",
  appId: "1:767187090185:web:16f712a9b3e8a00bcfb1d8"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
