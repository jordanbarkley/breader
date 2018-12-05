console.log("app.js included");

// get relevant html elements
const paragraphOutput = document.querySelector("#outputValue");
const buttonTest = document.querySelector("#buttonTest");

// Get a reference to the database service
var database = firebase.database();

// @param - string name ("The Itsy Bitsy Spider")
// @param - string text (<the itsy bits spider lyrics>)
function breaderAddText(name, text) {
    breaderSetX("texts/" + name, text);
}

// @param - htmlColor color ("#RRGGBB")
function breaderSetBackgroundColor(color) {
    breaderSetX("backgroundColor", color);
}

// @param - htmlColor color ("#RRGGBB")
function breaderSetCardColor(color) {
    breaderSetX("cardColor", color);
}

// @param - htmlColor color ("#RRGGBB")
function breaderSetFontColor(color) {
    breaderSetX("fontColor", color);
}

// @param - int size
function breaderSetFontSize(size) {
    breaderSetX("fontSize", size);
}

// @param - int wpm
function breaderSetWPM(wpm) {
    breaderSetX("wpm", wpm);
}

// @promise - htmlColor color ("#RRGGBB")
function breaderGetBackgroundColor() {
    return breaderGetX("backgroundColor");
}

// @promise - htmlColor color ("#RRGGBB")
function breaderGetCardColor() {
    return breaderGetX("cardColor");
}

// @promise - htmlColor color ("#RRGGBB")
function breaderGetFontColor() {
    return breaderGetX("fontColor");
}

// @promise - int size
function breaderGetFontSize() {
    return breaderGetX("fontSize");
}

// @param - name
// @promise - text
function breaderGetText(name) {
    return breaderGetX("texts/" + name);
}

// @promise - int wpm
function breaderGetWPM() {
    return breaderGetX("wpm");
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

function breaderGetX(path) {
    // get uid
    var uid = breaderGetUID();

    // if there's a valid uid
    if (uid) {

        // get /<uid>/path
        return database.ref(uid + "/" + path).once("value", function(snapshot) {
            return snapshot.val() || null;
        });

    // otherwise
    } else {
        // log an error
        console.log("Unable to get uid. Is the user logged in?");
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

