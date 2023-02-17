
//ADICIONE SEUS LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDtO-922nHImM_Kwvr5cdUvpluTRyneBug",
  authDomain: "kiwifruru.firebaseapp.com",
  databaseURL: "https://kiwifruru-default-rtdb.firebaseio.com",
  projectId: "kiwifruru",
  storageBucket: "kiwifruru.appspot.com",
  messagingSenderId: "139631749165",
  appId: "1:139631749165:web:b680e63989122aac30b0a4"
};

firebase.initializeApp(firebaseConfig);
  userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  });

    localStorage.setItem("roomName", roomName);
    
    window.location = "kiwifruPage.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { 
  document.getElementById("output").innerHTML = "";
   snapshot.forEach(function(childSnapshot) { 
    childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kiwifruPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
