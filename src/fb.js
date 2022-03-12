import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase-config.js';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

let fb = {
  getWords: async () => {
    const wordsCol = collection(db, 'words');
    const wordSnapshot = await getDocs(wordsCol);
    const wordList = wordSnapshot.docs.map(doc => doc.data());
    return wordList;
  }
}

export {fb};