// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1wA-DMQdJOzDqYyIO8hUN-hYEqAcjn2Y",
  authDomain: "psycoemotion-4826f.firebaseapp.com",
  projectId: "psycoemotion-4826f",
  storageBucket: "psycoemotion-4826f.appspot.com",
  messagingSenderId: "291829281764",
  appId: "1:291829281764:web:deea988e6d0c65b1744df1",
  measurementId: "G-R0XEP8FV93",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)

