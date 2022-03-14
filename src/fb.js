import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { setDoc } from "firebase/firestore"; 
import { getFirestore, getDocs, doc, collection, setDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../config/firebase-config.js';
//  doc,
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

let fb = {
  getWords: async () => {
    const wordsCol = collection(db, 'words');
    const wordSnapshot = await getDocs(wordsCol);
    const wordList = wordSnapshot.docs.map(doc => doc.data());
    return wordList;
  },
  writeWord: async (word, rus) => {
    const wordsRef = collection(db, "words");
    let res = await setDoc(doc(wordsRef), {word: word, rus: rus});
    console.log(res)
  }
}

export {fb};