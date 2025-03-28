// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdOXGwPjNwNHRpf6jMjI5H11FoW0bNhk",
  authDomain: "astro-auth-182dd.firebaseapp.com",
  projectId: "astro-auth-182dd",
  storageBucket: "astro-auth-182dd.firebasestorage.app",
  messagingSenderId: "829192716085",
  appId: "1:829192716085:web:7924740ed57a8578d3167c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export const firebase = {
  app,
  auth,
};
