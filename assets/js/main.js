// Firebase import    *******************
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where, getDocs,
    orderBy, serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
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
const db = getFirestore(app)
const user = auth.currentUser;
// end. *****************************************


// Check if user logged in **********************
const userCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
        // todo delete
        console.log("User logged in on Tasks page")
        // const user = auth.currentUser;
        // User is signed in, display their details
        const uid = user.uid;
        const email = user.email;
        const displayName = getUsernameFromEmail(email);
        const photoURL = user.photoURL;
        const navUser = document.getElementById('offcanvasNavbarLabel')

        // todo delete
        console.log("User ID:", uid);
        console.log("Email:", email);
        console.log("Display name:", displayName);
        console.log("Photo URL:", photoURL);

        navUser.textContent = displayName

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


const requestFormModal = document.getElementById('requestFormModal')
const requestJobBtn = document.getElementById('requestJobBtn')
const floatingBtn = document.getElementById('floatingBtn')

requestJobBtn.addEventListener('click', (e) => {
    e.preventDefault()

    // Call modal
    requestFormModal.classList.add("show");
    requestFormModal.style.display = "block";

    // Change the text content
    modalHeader.textContent = 'Job request!'

    // Make floating button appear
    floatingBtn.style.display = "none"

    // close modal
    closeModal()
})


//  Generate user name from email   *******************
function getUsernameFromEmail(email) {
    const username = "Hello @" + email.split('@')[0];
    return username;
}
//  end.    *******************************************

// Close modal  ***************************************
function closeModal() {
    // Modal buttons
    const closeModalXBtn = document.getElementById("closeModalXBtn")
    const newRequestBtn = document.getElementById("newRequestBtn")
    const cancelRequestBtn = document.getElementById('cancelRequestBtn')

    closeModalXBtn.addEventListener("click", function () {
        requestFormModal.classList.add("hide");
        requestFormModal.style.display = "none";

        // Make floating button disappear
        floatingBtn.style.display = "block"
    });

    cancelRequestBtn.addEventListener("click", function () {
        requestFormModal.classList.add("hide");
        requestFormModal.style.display = "none";

        // Make floating button disappear
        floatingBtn.style.display = "block"
    });

    newRequestBtn.addEventListener("click", function () {
        requestFormModal.classList.add("hide");
        requestFormModal.style.display = "none";

        // Make floating button disappear
        floatingBtn.style.display = "block"
    });
}
//  end.    *******************************************


// Add data to the collection from an HTML form ********
const collectionRef = collection(db, 'tasks');
const requestForm = document.getElementById('requestForm');
const newRequestBtn = document.getElementById('newRequestBtn')
newRequestBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const jobDescription = document.getElementById('jobDescription').value;
    const note = document.getElementById('note').value;
    // const message = form.querySelector('#message').value;

    // Check for safety issues
    const issue = checkSafetyIssue('issue')

    try {
        await addDoc(collectionRef, {
            jobDescription: jobDescription,
            note: note,
            issue: issue,
            timestamp: serverTimestamp()
        });
        console.log('Data added successfully!');
         clearRequestForm();
    } catch (error) {
        console.error('Error adding data: ', error);
    }
});
//  end.    *******************************************


// Check for safety issues ****************************
function checkSafetyIssue(issue) {
    const nosSafetyIssue = document.getElementById('noSafetyIssue')
    const yesSafetyIssue = document.getElementById('yesSafetyIssue')

    if (nosSafetyIssue.checked) {
        console.log('No safety issue')
        issue = 'No safety issue'
    } else if (yesSafetyIssue.checked){
        console.log('Yes safety issue')
        issue = 'Yes safety issue'
    }
    return issue
}
// end.    *******************************************


// Clear form after submit ****************************
function clearRequestForm() {
    const jobDescription = document.getElementById('jobDescription').value = '';
    const note = document.getElementById('note').value = '';
}
//  end.    *******************************************