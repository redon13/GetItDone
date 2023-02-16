

// Firebase import    *******************
import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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


// signing user up  ***********************
const signUpForm = document.querySelector('.signup')
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // checking passwords
    checkPasswordStrength()

})
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

        // create user
        createUserWithEmailAndPassword(auth, email, password).then((cred) => {
            signUpForm.reset()
        }).then((userCredential) => {
            // Signed in
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