import { auth, onAuthStateChanged } from "./scripts/firebase.js";
// import './firebase.js'
console.log("ok");
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user");
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;
    console.log(uid);
    
    // console.log(uid);

    window.location = "./pages/seren.html";
    // ...
  } else {
    // User is signed out
    console.log("not");
    window.location = "./pages/login-page.html";

    // ...
  }
});
