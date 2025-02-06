// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk-D02twukMIU0U2-C0tJBknNkMcMbXTg",
  authDomain: "upliance-react-assignment.firebaseapp.com",
  projectId: "upliance-react-assignment",
  storageBucket: "upliance-react-assignment.firebasestorage.app",
  messagingSenderId: "147268736441",
  appId: "1:147268736441:web:86dc16c84b19e49f9cd268",
  measurementId: "G-VMY3WZHH2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider with custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider };
export default app;
