import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import config from '../localconfig.component';


 const config = {
     apiKey: "AIzaSyCcqIv_fjH5LTw7A6Q9hjevJfGTmN3nIqk",
     authDomain: "crwn-db-4b7c9.firebaseapp.com",
     databaseURL: "https://crwn-db-4b7c9.firebaseio.com",
     projectId: "crwn-db-4b7c9",
     storageBucket: "crwn-db-4b7c9.appspot.com",
     messagingSenderId: "659711574442",
     appId: "1:659711574442:web:1e28381cc2890ad32aabd3",
     measurementId: "G-0B6V9D8PRK"
   };

   export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error user create!', error.message);
      }
    }
    return userRef;

   };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;