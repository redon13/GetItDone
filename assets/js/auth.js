

// Firebase import    *******************
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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


//  password check  ***********************
function checkPasswordStrength() {
    const email = signUpForm.email.value
    const password = signUpForm.password.value
    let pass = document.getElementById("password").value;
    let passwconf = document.getElementById("passwordconf").value;

    // todo delete it
    console.log(pass + ' ' + passwconf)

    let strength = 0;

    if (pass == passwconf){
        if (pass.length < 6) {
            //document.getElementById("passwordStrength").innerHTML = "Too short";
            console.log('Password too short')
            return;
        }

        // todo future feature - checking password strength
        if (pass.length > 7) strength += 1;
        if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1;
        if (pass.match(/([a-zA-Z])/) && pass.match(/([0-9])/))  strength += 1;
        if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1;
        if (pass.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;

        if (strength < 2) {
            //document.getElementById("passwordStrength").innerHTML = "Weak";
            console.log('Password weak!')
        } else if (strength == 2) {
            //document.getElementById("passwordStrength").innerHTML = "Medium";
            console.log('Password medium strength!')
        } else {
            //document.getElementById("passwordStrength").innerHTML = "Strong";
            console.log('Password strong!')
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
        console.log('Password does not match!')
        signUpForm.reset()
        return;
    }

}

//  end.            ***********************


// signing user up  ***********************
const signUpForm = document.querySelector('.signup')
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // checking passwords
    checkPasswordStrength()

})
//  end.    *******************************

// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app)