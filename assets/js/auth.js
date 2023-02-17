

// Firebase import    *******************
import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// end. *****************************************

//  Check if the user is already logged in   *****************************
//  todo fix it
function ifUserLoggedIn(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, redirect to another page
            location.href = "tasks.html";
        } else {
            // No user is signed in, redirect to the login page
            location.href = "index.html";
        }
    });

}


//  end.    ********************************

//  Call function depends on index.html/login or register.html/signup loaded    **********
//     window.onload = function() {
//         ifUserLoggedIn()
        // if (window.location.href.indexOf("index.html") > -1) {
        //     // ifUserLoggedIn()
        //     userLogin();
        // }else {
        //     userSignUp()
        // }
   // }
    document.addEventListener("DOMContentLoaded", function(event) {
        ifUserLoggedIn()
    });

//  end.    ***************************************


// Log user in  *********************
function userLogin() {
    const logInForm = document.querySelector('.login')
    const loginEmail = logInForm.email.value
    const loginPassword = logInForm.password.value

    logInForm.addEventListener('submit', (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // todo delete
                console.log("User login OK !!!")
                // User signed in
                window.location = "tasks.html";
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // todo delete
                console.log("User login failed !!!")

                // Call modal
                passwordCheckModal()

                // Change the text content
                modalMessage.textContent = "Wrong email or password!";
                modalHeadre.textContent = 'Oooops!'

                // close modal
                modalClose()
            });
    })
}
//  end.    *************************

// signing user up  ***********************
function userSignUp(){
    const signUpForm = document.getElementById("signup")
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault()

        // checking passwords
        checkPasswordStrength()

    })
}

//  end.    *******************************

function modalClose(){

    // modal clos X button
    const closeModalXBtn = document.getElementById("closeModalXBtn")
    const passwordCheckModal = document.getElementById('passwordCheckModal')
    closeModalXBtn.addEventListener("click", function() {
        passwordCheckModal.classList.add("hide");
        passwordCheckModal.style.display = "none";
    });

    // modal close button
    const closeModal = document.getElementById("closeModalBtn")
    closeModal.addEventListener("click", function() {
        passwordCheckModal.classList.add("hide");
        passwordCheckModal.style.display = "none";
    });
}

function passwordCheckModal(){
    // toggle modal warning if password does not match
    const passwordCheckModal = document.getElementById('passwordCheckModal')
    passwordCheckModal.classList.add("show");
    passwordCheckModal.style.display = "block";
}

//  password check  ***********************
function checkPasswordStrength() {
    const email = signUpForm.email.value
    const password = signUpForm.password.value
    const passwconf = signUpForm.passwordconf.value
    const modalMessage = document.getElementById('modalMessage')
    const modalHeadre = document.getElementById('modalHeader')


    let strength = 0;

    if (password === passwconf){
        if (password.length < 6) {
            // Call modal
            passwordCheckModal()

            // Change the text content
            modalHeadre.textContent = "Ooops!"
            modalMessage.textContent = "Password too short! At least 6 character required!"

            //  Clear password fields
            signUpForm.password.value = ""
            signUpForm.passwordconf.value = ""

            // close modal
            modalClose()
            return;
        }

        // todo future feature - checking password strength
        if (password.length > 7) strength += 1;
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1;
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1;
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1;
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;

        if (strength < 2) {

            // Call modal
            passwordCheckModal()

            // Change the text content
            modalHeadre.textContent = "Ooops!"
            modalMessage.textContent = "Password too weak!"

            //  Clear password fields
            signUpForm.password.value = ""
            signUpForm.passwordconf.value = ""

            // Close modal
            modalClose()

            return;

        } else if (strength === 2) {

            // Call modal
            //passwordCheckModal()

            // Change the text content
            // modalHeadre.textContent = "Ooops!"
            // modalMessage.textContent = "Medium strength password!"

            //  Clear password fields
            // signUpForm.password.value = ""
            // signUpForm.passwordconf.value = ""

            // Close modal
            // modalClose()

        } else {

            // Call modal
            // passwordCheckModal()

            // Change the text content
            // modalHeadre.textContent = "Ooops!"
            // modalMessage.textContent = "Strong password!"

            // Close modal
            // modalClose()

        }

        // Create user and direct to tasks.html
        createUserWithEmailAndPassword(auth, email, password).then((cred) => {
            signUpForm.reset()
        }).then((userCredential) => {
            // User signed in
            window.location = "tasks.html";
            // todo get it work
            //const user = userCredential.user;
            // todo delete
            //console.log(user)
            // ...
        }).catch((err) => {
            console.log(err.message + err.code)
        })
    } else {

        // Call modal
        passwordCheckModal()

        // Change the text content
        modalMessage.textContent = "Password does not match!";
        modalHeadre.textContent = 'Oooops!'

        //  Clear password fields
        signUpForm.password.value = ""
        signUpForm.passwordconf.value = ""

        // close modal
        modalClose()

        return;
    }

}

//  end.            ***********************


// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app)