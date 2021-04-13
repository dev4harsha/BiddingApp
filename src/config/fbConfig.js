import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCCPCdoFGNDHJmxWel-Sp0hjwq5QxLmV9g',
  authDomain: 'biddomain-4d43d.firebaseapp.com',
  projectId: 'biddomain-4d43d',
  storageBucket: 'biddomain-4d43d.appspot.com',
  messagingSenderId: '999883011276',
  appId: '1:999883011276:web:f14301a001ca76de473e69',
  measurementId: 'G-9553S5P7XR',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
firebase.firestore().settings({ timestampsInSnapshots: true });
export { firebaseConfig, storage, firebase as default };
