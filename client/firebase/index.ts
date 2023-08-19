import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZUVkaA2aTnfg5kkm2vuqHkwewJyYSoWk",
  authDomain: "zettel-b2004.firebaseapp.com",
  projectId: "zettel-b2004",
  storageBucket: "zettel-b2004.appspot.com",
  messagingSenderId: "530029117334",
  appId: "1:530029117334:web:4d8b08e71be779c419a7b7",
  measurementId: "G-LE7M6W10M1"
};


let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export default firebaseConfig;