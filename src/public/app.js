console.log("app.js included");

// get relevant html elements
const paragraphOutput = document.querySelector("#outputValue");
const buttonTest = document.querySelector("#buttonTest");

// Get a reference to the database service
var database = firebase.database();

var testText = "yeah\ti'm a piece   \t\n of shit\n, you know i  plead the         fifth, i tell her holla if you need some dick";
    
// remove duplicate white space
testText = testText.replace(/\s+/g, ' ');

// get the array of words
getTextArray(testText);

// yes
// setInterval(displayWord, 500);

// Breader global vars
var textArr;
var currentWord = 0;

// Breader functions

// displays a word in paragraphOutput
function displayWord() {
    var word = getWord();
    paragraphOutput.innerHTML = word;
}

// gets current word and advances currentWord global var
function getWord() {
    if (currentWord == textArr.length) {
        return "DONE.";
    }

    var ret = textArr[currentWord];
    currentWord++;
    return ret;
}

// sets a global variable textArr to a array of strings seperated by a space
// @param - string text
function getTextArray(text) {
    textArr = text.split(' ');
}

// determines if a character is white space
// @param - char c
function isWhiteSpace(c) {
    if ((c <= 32 && c >= 0) || c == 127) {
        return true;
    } else {
        return false;
    }
}

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

