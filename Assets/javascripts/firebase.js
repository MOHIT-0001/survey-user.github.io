const firebaseConfig = {
    apiKey: "AIzaSyAbzdmCNVOzMZUnX7zhD_JmBnQHULkjqPI",
    authDomain: "survey-2-d3b0e.firebaseapp.com",
    projectId: "survey-2-d3b0e",
    storageBucket: "survey-2-d3b0e.appspot.com",
    messagingSenderId: "92566196418",
    appId: "1:92566196418:web:2b5d7d80b5e752b26bab5b",
    measurementId: "G-ZKSTMEB7FZ",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  export const db = firebase.firestore();