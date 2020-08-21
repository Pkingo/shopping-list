import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import env from "./env";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: "shopping-list-6a549.firebaseapp.com",
  databaseURL: "https://shopping-list-6a549.firebaseio.com",
  projectId: "shopping-list-6a549",
  storageBucket: "shopping-list-6a549.appspot.com",
  messagingSenderId: "1039807960756",
  appId: "1:1039807960756:web:cdd38d9c56ca3dc441e9e1",
};

firebase.initializeApp(firebaseConfig);

export const checkIsLoggedIn = (): Promise<firebase.User> =>
  new Promise((resolve, rejects) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        rejects("Not logged in");
      }
    });
  });
export const auth = firebase.auth();
export const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
