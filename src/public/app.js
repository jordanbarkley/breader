console.log("app.js included");

// TODO: remove this
const USERNAME = "username";  

// get relevant html elements
const paragraphOutput = document.querySelector("#outputValue");
const buttonTest = document.querySelector("#buttonTest");

// Get a reference to the database service
var database = firebase.database();

// add a listener for click event on test button
buttonTest.addEventListener("click", function() {
    paragraphOutput.innerHTML = breaderGetUID();
    breaderSetBackgroundColor("#001122");
    breaderSetCardColor("#334455");
    breaderSetFontSize("#667788");
    breaderAddText("The Itsy Bitsy Spider", "went up the water spout or some shit idk this is just for testing");
    breaderSetWPM(500);
});

// Breader functions

// string name ("The Itsy Bitsy Spider")
// string text (<the itsy bits spider lyrics>)
function breaderAddText(name, text) {
    breaderSetX("texts/" + name, text);
}

// htmlColor color ("#RRGGBB")
function breaderSetBackgroundColor(color) {
    breaderSetX("backgroundColor", color);
}

// htmlColor color ("#RRGGBB")
function breaderSetCardColor(color) {
    breaderSetX("cardColor", color);
}

// htmlColor color ("#RRGGBB")
function breaderSetFontColor(color) {
    breaderSetX("fontColor", color);
}

// int size
function breaderSetFontSize(size) {
    breaderSetX("fontSize", size);
}

// int wpm
function breaderSetWPM(wpm) {
    breaderSetX("wpm", wpm);
}

// DO NOT USE THE FUNCTIONS BELOW OUTSIDE OF "app.js"
function breaderGetUID() {
    // get current user
    var user = firebase.auth().currentUser;

    // if user is logged in
    if (user) {
        // return user uid
        return user.uid;

    // if user is not logged in
    } else {
        // return null
        return null;
    }
}


function breaderSetX(path, value) {
    // get uid
    var uid = breaderGetUID();

    // if there's a valid uid
    if (uid) {
        // set /<uid>/wpm = wpm
        database.ref(uid + "/" + path).set(value);

    // otherwise
    } else {
        // log an error
        console.log("Unable to get uid. Is the user logged in?");
    }
}

