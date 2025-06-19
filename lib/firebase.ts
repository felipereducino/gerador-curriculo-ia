import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfigString = process.env.FIREBASE_CONFIG;

if (!firebaseConfigString) {
  throw new Error(
    "A configuração do Firebase não foi encontrada no .env.local"
  );
}

const firebaseConfig = JSON.parse(firebaseConfigString);

// Inicializa o Firebase apenas uma vez
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
