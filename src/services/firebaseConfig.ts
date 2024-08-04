// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARIk97AZiHJmqslqCWZRnayjYuXgJMPqM",
  authDomain: "desafio-03.firebaseapp.com",
  projectId: "desafio-03",
  storageBucket: "desafio-03.appspot.com",
  messagingSenderId: "417383123586",
  appId: "1:417383123586:web:d9adc66bc052846bfa429b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


