import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJWwI1aib70HQliTbrBO08Qs4ybXKWZC8",
  authDomain: "liftright-1e46c.firebaseapp.com",
  projectId: "liftright-1e46c",
  storageBucket: "liftright-1e46c.appspot.com",
  messagingSenderId: "913554305810",
  appId: "1:913554305810:web:81b3f52628ea9fea5439cb",
  measurementId: "G-LMND9Y8YS7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

AOS.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
