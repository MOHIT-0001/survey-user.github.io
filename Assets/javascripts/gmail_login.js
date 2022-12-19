import {db} from './firebase.js'
window.addEventListener('load', bindEvents);
function bindEvents(){
    document.querySelector('#login').addEventListener('click',login);
}
function login(){
    console.log('Fire Base ', firebase);
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // console.log('User info is ',user);
    console.log("email is ", user.email);
    sessionStorage.username = user.displayName;
    sessionStorage.userphoto = user.photoURL;
    localStorage.setItem("email",user.email);
    location.href = './show_question.html';
    // ...
  }).catch((error) => {
      console.log('Error is ',error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    // "This domain (127.0.0.1) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab."
  });
}
