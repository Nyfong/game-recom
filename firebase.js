// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyBvoBuQGC-NbiIcHXtBVVsxzKvCANSy0lM",
  authDomain: "saybag-a1360.firebaseapp.com",
  databaseURL: "https://saybag-a1360-default-rtdb.firebaseio.com/", // Add this line
  projectId: "saybag-a1360",
  storageBucket: "saybag-a1360.appspot.com",
  messagingSenderId: "63298052210",
  appId: "1:63298052210:web:cd0812bccef62326efa2eb",
  measurementId: "G-8TJ8Y387FZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Realtime Database
const database = getDatabase(app); // Add this line

export { app, analytics, database }; // Export database
