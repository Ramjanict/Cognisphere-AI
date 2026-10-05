// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB8TZEzw0BnXfXB99oTx3f-fvCfhMAy5uE",
//   authDomain: "cognisphere-5e8e4.firebaseapp.com",
//   projectId: "cognisphere-5e8e4",
//   storageBucket: "cognisphere-5e8e4.firebasestorage.app",
//   messagingSenderId: "1018119765407",
//   appId: "1:1018119765407:web:8501a86614e12e72fc11aa",
//   measurementId: "G-SXF7PJCB2V",
// };

const app = initializeApp(firebaseConfig);

// Initialize Auth and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
