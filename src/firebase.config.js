// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJULLIpiVSsAH1M1P3t-BIlSnuZwxlBGU",
    authDomain: "logistics-38d6a.firebaseapp.com",
    projectId: "logistics-38d6a",
    storageBucket: "logistics-38d6a.appspot.com",
    messagingSenderId: "582024182948",
    appId: "1:582024182948:web:3c6038baef6268c470ba31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
