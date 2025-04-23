import { initializeApp } from 'firebase/app'; 

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; 

 

const firebaseConfig = {
    apiKey: "AIzaSyB5i_GS2Lg8dGx8Y5ris4FvfwvNz4HJucU",
    authDomain: "vue3-b0153.firebaseapp.com",
    projectId: "vue3-b0153",
    storageBucket: "vue3-b0153.firebasestorage.app",
    messagingSenderId: "315135589175",
    appId: "1:315135589175:web:1b704dd22c4b9b8bfe38b2",
    measurementId: "G-Q8E4KVSTHC"
};

 

const app = initializeApp(firebaseConfig); 

const auth = getAuth(app); 

const provider = new GoogleAuthProvider(); 

 

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged }; 