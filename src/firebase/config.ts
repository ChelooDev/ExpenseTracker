// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByEsqmaPzEtpRzHqnTjjTVEWGwkgIzSbk",
    authDomain: "expensetracker-71a3c.firebaseapp.com",
    projectId: "expensetracker-71a3c",
    storageBucket: "expensetracker-71a3c.firebasestorage.app",
    messagingSenderId: "312275057321",
    appId: "1:312275057321:web:0cf0ebce323d9952d2c7b8",
    measurementId: "G-BL0JR0KWWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);

export default app;