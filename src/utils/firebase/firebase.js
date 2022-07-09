import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAF24kg7DJaGm5dERyGMqkILAO5Ik6f4cM',
  authDomain: 'crwn-clothing-db-3758b.firebaseapp.com',
  projectId: 'crwn-clothing-db-3758b',
  storageBucket: 'crwn-clothing-db-3758b.appspot.com',
  messagingSenderId: '819835473292',
  appId: '1:819835473292:web:a59c6ad991ec8a1a589aa9',
};

// const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
  }

  return userDocRef;

  //if user data does not exist
  //create / set the document with the data from userAuth in my collection

  //if user data exists
  //return userDocRef
};
