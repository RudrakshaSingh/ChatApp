// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3KqigbYmmiCGibgpBIq2DYyIVrUe_o0A",
  authDomain: "chatapp-321b0.firebaseapp.com",
  projectId: "chatapp-321b0",
  storageBucket: "chatapp-321b0.firebasestorage.app",
  messagingSenderId: "387750652115",
  appId: "1:387750652115:web:dc79accbe5d6556a530c26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= initializeAuth(app, {
  persistence: getReactNativePersistence( AsyncStorage),//even if app is closed user data persists
});

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");