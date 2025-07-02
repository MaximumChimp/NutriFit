import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyD38v7aPxM-yO2_uoFIYF1DIVj_3SjlQrk',
  authDomain: 'nutrifit-d98f5.firebaseapp.com',
  projectId: 'nutrifit-d98f5',
  storageBucket: 'nutrifit-d98f5.appspot.com',
  messagingSenderId: '443385573457',
  appId: '1:443385573457:web:a81c4a80df6d5251af8870',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Enable persistent Auth state
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
