firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // user is signed in so get the book they have
        var uid = user.uid;
        console.log("book name: " + book);

        database.ref(uid + "/texts/" + book).once("value", function(snapshot) {
            // get text
            var text = snapshot.val();

            // parse text
            text = deleteWhiteSpace(text);

            // fill array
            getTextArray(text);

            // display first word
            displayWord();
        });
    }
});

// variables
var textArr = [];
var currentWord = 0;
var displaying = false;
var book = getParameterByName("book"); 
var interval = null;
var speed = 0;

// html elements
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var resetButton = document.getElementById("resetButton");
var dropdownSpeed = document.getElementById("speed");
var dropdownFontSize = document.getElementById("fontSize");
var dropdownFontColor = document.getElementById("fontColor");
var dropdownBackgroundColor = document.getElementById("backgroundColor");
var dropdownCardColor = document.getElementById("cardColor");
var paragraphCurrentWord = document.getElementById("currentWord");
var buttonApplySettings = document.getElementById("buttonApplySettings");
var jumbotron = document.getElementById("jumbotron");

// populate wpm
function populateSpeed() {
    var i;
    dropdownSpeed.innerHTML = ''
    for (i = 100; i <= 700; i += 25) {
        dropdownSpeed.innerHTML += "<option>" + i + "</option>";
    }
}
populateSpeed();


// Breader functions
function deleteWhiteSpace(text) {
    return text.replace(/\s+/g, ' ');
}

// displays a word in paragraphOutput
function displayWord() {
    var word = getWord();
    if (word != null) {
        paragraphCurrentWord.innerHTML = word;
    }
}

// gets current word and advances currentWord global var
function getWord() {
    if (currentWord == textArr.length) {
        displaying = false;
        if (interval != null) {
            clearInterval(interval);
            interval = null;
        }
        return null;
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

startButton.addEventListener("click", function() {
    if (!displaying) {
        displaying = true;
        interval = setInterval(displayWord, 500);
    }
});

stopButton.addEventListener("click", function() {
    if (displaying) {
        displaying = false;
        clearInterval(interval);
    }
});

resetButton.addEventListener("click", function() {
    if (interval != null) {
        clearInterval(interval)
    }
    displaying = false;
    currentWord = 0;
    displayWord();
});

function applySettings() {
    var fontColor = dropdownFontColor.options[dropdownFontColor.selectedIndex].value;
    paragraphCurrentWord.style.color = fontColor;
    breaderSetFontColor(fontColor);

    var fontSize = dropdownFontSize.options[dropdownFontSize.selectedIndex].value;
    paragraphCurrentWord.style.fontSize = fontSize;
    breaderSetFontSize(fontSize);

    var cardColor = dropdownCardColor.options[dropdownCardColor.selectedIndex].value;
    jumbotron.style.backgroundColor = cardColor;
    breaderSetCardColor(cardColor);
    
    speed = dropdownSpeed.options[dropdownSpeed.selectedIndex].value;
    breaderSetWPM(speed);

    var backgroundColor = dropdownBackgroundColor.options[dropdownBackgroundColor.selectedIndex].value;
    document.body.style.backgroundColor = backgroundColor;
    breaderSetBackgroundColor(backgroundColor);

}

buttonApplySettings.addEventListener("click", function() {
    applySettings();
});