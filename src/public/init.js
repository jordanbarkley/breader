// Initialize Firebase (this is copied from Firebase console)
var config = {
    apiKey: "AIzaSyCw9tTlFUEwgjQ84PZKarqsxLTMlj7OHrk",
    authDomain: "breader-cs252.firebaseapp.com",
    databaseURL: "https://breader-cs252.firebaseio.com",
    projectId: "breader-cs252",
    storageBucket: "breader-cs252.appspot.com",
    messagingSenderId: "923894668859"
};
firebase.initializeApp(config);

// make sure the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // user signed in, do nothing
        console.log(user.uid);
    } else {
        // user is not signed in, redirect to index.html
        // window.location.href = "index.html";
    }
});