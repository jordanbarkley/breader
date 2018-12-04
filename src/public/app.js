console.log("app.js included");

// TODO: remove this
const USERNAME = "username";  

// get relevant html elements
const textFieldInput = document.querySelector("#inputValue");
const paragraphOutput = document.querySelector("#outputValue");
const buttonSave = document.querySelector("#buttonSaveValue");
const buttonLoad = document.querySelector("#buttonLoadValue");

// Get a reference to the database service
var database = firebase.database();

// add a listener for click event on save button
buttonSave.addEventListener("click", function() {
    const textToSave = textFieldInput.value;
    database.ref(USERNAME + "/test").set(textToSave);
});

// add a listener for click event on save button
buttonLoad.addEventListener("click", function() {
    // get snapshot of /<username>/test
    database.ref(USERNAME + "/test").on("value", function(snapshot) {
        // update paragraph text with value
        paragraphOutput.innerHTML = snapshot.val();
    });
});

// get user details
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        paragraphOutput.innerHTML = "user email " + user.email;
    } else {
        paragraphOutput.innerHTML = "no user is logged in";
    }
});