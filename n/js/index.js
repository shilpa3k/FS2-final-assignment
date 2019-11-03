const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            // account info
            const html = `
            <h5>Logged in as ${user.email}</h5><br/>
            <div>${doc.data().bio}</div>
            `;
            accountDetails.innerHTML = html;
        })
        
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    } else {
        // hide account info
        accountDetails.innerHTML = '';

        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block'); 
    }
}

// load screens in page
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
}); 

// inputting message in contact space
    function mySubmit() {
        var x, y, text;

        x = document.getElementById('sub').value;
        y = document.getElementById('message').value;


        if (y == ""){
        alert ("Please fill in before submitting");
        return false;
        } else {
        console.log('message sent');
        }
};

// 
const messagesList = document.querySelector('.create-from');

// set messages
 /* const setupMessages = (data) => {

    let html = '';
    data.forEach(doc => {
        const msg = doc.data();
        console.log(msg);
    });
}; */