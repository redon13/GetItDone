

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

//  Check if the user is already logged in on page load    **********


//  Switch between login and signup forms    **********
const loginFormContainer = document.getElementById('loginFormContainer')
const signupFormContainer = document.getElementById('signupFormContainer')
const toSignupFormBtn = document.getElementById('toSignupFormBtn')
const toLoginFormBtn = document.getElementById('toLoginFormBtn')
toSignupFormBtn.addEventListener('click', (e) => {
    loginFormContainer.style.display = "";
    signupFormContainer.style.display = "none";
})
toLoginFormBtn.addEventListener('click', (e) => {
    loginFormContainer.style.display = "none";
    signupFormContainer.style.display = "";
})
// end.    ***************************************


// Log user in  *********************
    const logInForm = document.getElementById('login')

    logInForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const loginEmail = logInForm.loginEmail.value
        const loginPassword = logInForm.loginPassword.value
        const passwordCheckModal = document.getElementById('passwordCheckModal')
        const modalMessage = document.getElementById('modalMessage')
        const modalHeader = document.getElementById('modalHeader')


        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // User signed in
                window.location = "tasks.html";
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                // Call modal
                passwordCheckModal.classList.add("show");
                passwordCheckModal.style.display = "block";

                // Change the text content
                modalMessage.textContent = "Wrong email or password!";
                modalHeader.textContent = 'Oooops!'

                signupFormContainer.style.display = "none";
                loginFormContainer.style.display = "";

                //  Clear password fields
                logInForm.loginEmail.value = ""
                logInForm.loginPassword.value = ""

                // close modal
                closeModal()
            });
    })
//  end.    *************************


// signing users up ***********************
const signupForm = document.getElementById('signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const emailSignup = signupForm.emailSignup.value
    const passwordSignup = signupForm.passwordSignup.value
    const passwordconfSignup = signupForm.passwordconfSignup.value
    const passwordCheckModal = document.getElementById('passwordCheckModal')
    const modalMessage = document.getElementById('modalMessage')
    const modalHeader = document.getElementById('modalHeader')

    // Check if password match
    if (passwordSignup !== passwordconfSignup) {
        // Call modal
        passwordCheckModal.classList.add("show");
        passwordCheckModal.style.display = "block";

        // Change the text content
        modalHeader.textContent = "Ooops!"
        modalMessage.textContent = "Passwords do not match!"

        signupFormContainer.style.display = "";
        loginFormContainer.style.display = "none";

        //  Clear password fields
        signupForm.passwordSignup.value = ""
        signupForm.passwordconfSignup.value = ""

        // close modal
        closeModal()
        return
    }else {

        createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
            .then(cred => {
                console.log('user created:', cred.user)
                signupForm.reset()
                // User signed in
                window.location = "tasks.html";
            })
            .catch(err => {
                console.log(err.message)

                // Change the modal text
                modalHeader.textContent = "Ooops!"
                modalMessage.textContent = "Something went wrong! Try again!"
                passwordCheckModal.classList.add("show");
                passwordCheckModal.style.display = "block";
                closeModal()
            })
    }
})

//  end.    *******************************


function closeModal() {
    // modal clos X button
    const closeModalXBtn = document.getElementById("closeModalXBtn")
    const passwordCheckModal = document.getElementById('passwordCheckModal')
// modal close button
    const closeModal = document.getElementById("closeModalBtn")
    closeModalXBtn.addEventListener("click", function () {
        passwordCheckModal.classList.add("hide");
        passwordCheckModal.style.display = "none";
    });

    closeModal.addEventListener("click", function () {
        passwordCheckModal.classList.add("hide");
        passwordCheckModal.style.display = "none";
    });
}


//  password check   not in use ***********************
function passwordCheck() {
    const email = signUpForm.email.value
    const password = signUpForm.password.value
    const passwconf = signUpForm.passwordconf.value
    const modalMessage = document.getElementById('modalMessage')
    const modalHeadre = document.getElementById('modalHeader')

    let strength = 0;

    if (password === passwconf) {
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

        }

        // todo future feature - checking password strength
        if (password.length > 7) strength += 1;
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;

        if (strength < 2) {

            // Call modal

            // Change the text content
            modalHeadre.textContent = "Ooops!"
            modalMessage.textContent = "Password too weak!"

            //  Clear password fields
            signUpForm.password.value = ""
            signUpForm.passwordconf.value = ""

            // Close modal

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

        }).catch((err) => {
            console.log(err.message + err.code)
        })
    } else {

        // Call modal

        // Change the text content
        modalMessage.textContent = "Password does not match!";
        modalHeadre.textContent = 'Oooops!'

        //  Clear password fields
        signUpForm.password.value = ""
        signUpForm.passwordconf.value = ""

        // close modal
    }
}
//  end.            ***********************
