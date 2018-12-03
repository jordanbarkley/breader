// TODO: remove this
const USERNAME = "username";  



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