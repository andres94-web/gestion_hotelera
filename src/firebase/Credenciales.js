// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFxi3VYlNQOMV-NYzL_hVXuTJaRh5bpsQ",
  authDomain: "hoteleria-1baf2.firebaseapp.com",
  projectId: "hoteleria-1baf2",
  storageBucket: "hoteleria-1baf2.appspot.com",
  messagingSenderId: "1079899331615",
  appId: "1:1079899331615:web:836c7212f4ee95e18e892a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp