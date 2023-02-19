// Firebase import    *******************
import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// end. **************************


// For Firebase JS SDK v7.20.0 and later, measurementId is optional ***************
const firebaseConfig = {
    apiKey: "AIzaSyCgSEjzaQMv6Cisttwa8ULNAtS9O-qPhkk",
    authDomain: "getitdone-7498f.firebaseapp.com",
    databaseURL: "https://getitdone-7498f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "getitdone-7498f",
    storageBucket: "getitdone-7498f.appspot.com",
    messagingSenderId: "580777068532",
    appId: "1:580777068532:web:556796d73378e03d0e9ba1",
    measurementId: "G-6RYDBF0FDH"
};
// end.  ******************************************************


// Initialize Firebase  *************************
initializeApp(firebaseConfig);
//  end ****************************************


//  Init services   *****************************
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// end. *****************************************


// Check if user logged in **********************
const userCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to another page
        console.log("User logged in on Tasks page")
    } else {
        // No user is signed in, redirect to the login page
        location.href = "index.html";
    }
});

window.onload = userCheck()

// Logging user out *************************************
const logoutButton = document.querySelector('.logoutBtn')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('user signed out')
            // No user is signed in, redirect to the login page
            location.href = "index.html";
        })
        .catch(err => {
            console.log(err.message)
        })
})
//  end.    ******************************************