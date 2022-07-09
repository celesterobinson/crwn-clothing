import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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

export const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

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
      console.log('Error creating the user', error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  auth,
  email,
  password
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
