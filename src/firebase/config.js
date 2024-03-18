import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDHy1ygEgcJ-M0dxWQlXrNqqrVZ5wPIX0Y",
  authDomain: "test-fire-a1616.firebaseapp.com",
  projectId: "test-fire-a1616",
  storageBucket: "test-fire-a1616.appspot.com",
  messagingSenderId: "985034643169",
  appId: "1:985034643169:web:45c74509c3b6653d73c9a0",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
