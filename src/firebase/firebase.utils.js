import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDvF9rIFfuseBB1r4ZPSYsBKKucpRK7N0Q",
  authDomain: "crwn-db-df99c.firebaseapp.com",
  databaseURL: "https://crwn-db-df99c.firebaseio.com",
  projectId: "crwn-db-df99c",
  storageBucket: "crwn-db-df99c.appspot.com",
  messagingSenderId: "476805896688",
  appId: "1:476805896688:web:d592db816ff9988da72535",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.massage);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
