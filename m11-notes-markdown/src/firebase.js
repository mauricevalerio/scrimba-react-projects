// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2ogpGi20vHHnF-2FcgkOw3BS4Pgi4q34",
    authDomain: "notes-markdown.firebaseapp.com",
    projectId: "notes-markdown",
    storageBucket: "notes-markdown.appspot.com",
    messagingSenderId: "496000681232",
    appId: "1:496000681232:web:7c2ca0f8a6a3e67df09195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const notesRef = collection(db, "notes")

