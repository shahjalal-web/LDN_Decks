import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKzuz3e6RWtpNIjVF_ZwOzWvDynorF5jc",
  authDomain: "ldn-desk.firebaseapp.com",
  projectId: "ldn-desk",
  storageBucket: "ldn-desk.firebasestorage.app",
  messagingSenderId: "213044820873",
  appId: "1:213044820873:web:4bdd1c91309979a5673f58",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
export type { User };
