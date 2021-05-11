import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCNvLMimNa3A31sGM6mOl9WqaHgvBLN0MA",
    authDomain: "outreach-portal-8d2c2.firebaseapp.com",
    projectId: "outreach-portal-8d2c2",
    storageBucket: "outreach-portal-8d2c2.appspot.com",
    messagingSenderId: "971578777854",
    appId: "1:971578777854:web:d6b885f2a227e5f5db05af"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()


export  {
   storage, firebase as default
 }


