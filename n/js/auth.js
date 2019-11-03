// db.collection('messages').get().then(snapshot => {
//     // console.log(snapshot.docs);
//     setupMessages(snapshot.docs);
// });

// listen for auth status changes
auth.onAuthStateChanged(user => {
    // console.log(user);
    if (user) {
        // console.log('user logged in:', user);
        setupUI(user);
        // db.collection('messages').get().then(snapshot => {
        //     // console.log(snapshot.docs);
        //     setupMessages(snapshot.docs);
        
    } else {
        // console.log('user logged out');
        setupUI();
        // setupMessages([]);
    };
});

// sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['email-su'].value;
    const password = signupForm['password-su'].value;

    // console.log(email,password);
    
    // signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm['bio-su'].value
        });
    }).then(() => {
        // console.log(cred);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = "";
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['email-li'].value;
    const password = loginForm['password-li'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred => {
        // console.log(cred.user);
        // close the login modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = "";
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.replace("index.html")


        // console.log('user signed out');
        // get the container object
        // replace with logout html body

        // const body = '<div>logged out page</div>'

        // container.innerHtml = body
    })
}); 


// submit message to contact

 const createMessage = document.querySelector('#create-form');
 createMessage.addEventListener('submit', (e) => {
     e.preventDefault();
 
     db.collection('messages').add({
     message: createMessage['message'].value
 }).then(() => {
     // reset form
     const modal = document.querySelector('#modal-create');
         createMessage.reset();
 }).catch(err => {
     console.log(err.message);
 })
 });
