import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA5rJntgH9905md3xncayzVTxpR7l_8drc",
  authDomain: "netflix-clone-25.firebaseapp.com",
  databaseURL: "https://netflix-clone-25.firebaseio.com",
  projectId: "netflix-clone-25",
  storageBucket: "netflix-clone-25.appspot.com",
  messagingSenderId: "548383833412",
  appId: "1:548383833412:web:c0325d9e14a65b0d142b11",
  measurementId: "G-QEPRKQTTFB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;

// {
//   "hosting": {
//     "site": "netflix-norms",
//     "public": "public",
//     ...
//   }
// }

// firebase deploy --only hosting:netflix-norms
