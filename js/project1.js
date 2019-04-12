
///boyfriend page
var boyfriend = '{"boyfriend_name":"Derryck"}';
var boyfriend_object = JSON.parse(boyfriend);

function show_boyfriend_name(){
  document.getElementById("boyfriend_name").innerHTML = boyfriend_object.boyfriend_name;

}


function changeImage(){
  document.getElementById("us").src = "../images/us2.jpg";
}

function changeImageback(){
  document.getElementById("us").src = "../images/us1.jpg";
}

//contact page
//get references to th 3 html elments on the page
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");
var holder = document.getElementById("holder");

 //get a ref to Firebase Storage, super critical
 var storage = firebase.storage();

 ////////////// Will
 function getImageForPath(p){
   var storageRef = firebase.storage().ref();
   var spaceRef = storageRef.child(p);

   storageRef.child(p).getDownloadURL().then(function(url) {

     var fullurl = url;
     alert(fullurl);
     holder.src = fullurl;

   }).catch(function(error) {
     //catch error here
   });
 }
 function adduser(){
   alert("adding user!");
   var email = document.getElementById("InputEmail1").value;
   var password = document.getElementById("InputPassword1").value;

   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

     // Handle Errors here
     var errorCode = error.code;

     var errorMessage = error.message;

     alert("error: "+ error.message);
   });
 }

 function signIn(){
   alert("Signing In");

   var email = document.getElementById("inputEmail").value;
   var password = document.getElementById("inputPassword").value;

   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    alert("Error signing in");

     // Handle Errors here.
     var errorCode = error.code;

     var errorMessage = error.message;

     alert(errorMessage);
   });
 }

 function signOut(){
   firebase.auth().signOut().then(function() {
     alert("Signed out!");
   }).catch(function(error) {
     // An error happened.
     var errorMessage = error.message;

     alert(errorMessage);
   });
 }


 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
       // User is signed in.
       alert(user.email);
       console.log(user.toJSON());
     } else {
       // No user is signed in.
       alert("user not signed in");
     }
   });

 /////////////
 fileButton.addEventListener('change', function(e){
 //get the file
 alert("uploading file...");
 var file = e.target.files[0];
 //create the storage ref
 var storageRef = firebase.storage().ref('images/'+file.name);
 //uplaod the file
 var task = storageRef.put(file);
 //update the progress bar
 task.on('state_changed',
   function progress(snapshot) {

     var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
     uploader.value = percentage;
   },
   function error(error){
    console.log(error);
  },
  function complete(){
    alert("upload complete");
    getImageForPath('images/'+file.name);
  }
  );
});
