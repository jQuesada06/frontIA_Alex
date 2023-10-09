import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" 
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage , ref} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAfBqAVSTVkLzWtj-aIRK44N4_9ZJYWA-c",
    authDomain: "ia-project-d466b.firebaseapp.com",
    projectId: "ia-project-d466b",
    storageBucket: "ia-project-d466b.appspot.com",
    messagingSenderId: "370489426987",
    appId: "1:370489426987:web:557a8c2771d47e955bd66e"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const storage = getStorage(app);


export {app, db, storage};