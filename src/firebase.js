import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFc1euBHJpqapqmVEDcdFSyZQPEHSmVKM",
  authDomain: "customer-crud-f47d1.firebaseapp.com",
  projectId: "customer-crud-f47d1",
  storageBucket: "customer-crud-f47d1.appspot.com",
  messagingSenderId: "724300981380",
  appId: "1:724300981380:web:2c9212c4e224e8259e8ed1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db, app };
