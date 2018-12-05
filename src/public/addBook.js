
var buttonAdd = document.getElementById("buttonAdd");
var bookText = document.getElementById("bookText");
var bookName = document.getElementById("bookName");

buttonAdd.addEventListener("click", function() {
    console.log("lcicked a button")
    breaderAddText(bookName.value, bookText.value);
    window.location.href = "books.html";
});