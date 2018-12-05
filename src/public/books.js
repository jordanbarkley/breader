
/*
firebase.auth().onAuthStateChanged(function(user){
    var userID = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref('sUsers');
    var newRoot = rootRef.child(userID).child('Societies')
     newRoot.once('value', function(snapshot){
         snapshot.forEach(function(_child){
             var society = _child.key;
             console.log(society);
         });
     });
 });
 */


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var uid = user.uid;
        // user signed in, do nothing
        database.ref(uid + "/texts").once("value", function(snapshot) {
            var element = document.getElementById("bookList");
            snapshot.forEach(function(node) {
                // add html for each book into inner html of element
                element.innerHTML += '<li><a class="btn-primary btn-block" href="reading.html?book=' + node.key + '">' + node.key + '</a></li>';
            });
        });
    }
});