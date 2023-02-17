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
nomedapessoa = localStorage.getItem("userName")
nomedasala = localStorage.getItem("roomName")
function send() {
    msg = document.getElementById("msg").value
    firebase.database().ref(nomedasala).push({
        name: nomedapessoa,
        message: msg,
        like: 0
    })
    document.getElementById("msg").value = ""
}
function getData() {
    firebase.database().ref("/" + nomedasala).on("value", function (snapshot) {
        document.getElementById("output").innerHTML = ""
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebaseMessageId = childKey
                messageData = childData
                console.log(firebaseMessageId)
                console.log(messageData)
                name=messageData["name"]
                message=messageData["message"]
                like=messageData["like"]
                namewithtag="<h4>"+name+"<img src='like.png' class='user_tick'></h4>"
                messagewithtag="<h4 class='message_h4'>"+message+"</h4>"
                likebuttom="<button class='btn btn-outline-danger' id="+firebaseMessageId+ "value="+ like+ "onclick='updateLike(this.id)'>"
                  spanwithtag="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span> </button> <hr>"
                  row=namewithtag+ messagewithtag+ likebuttom+ spanwithtag
                  document.getElementById("output").innerHTML+=row
          }
        }
      )
    }
  )
}
getData()
function updateLike(messageid){
  buttomid=messageid
  likes=document.getElementsById(buttomid).value
  updatelike=Number(likes)+1
  firebase.database().ref(roomName).child(messageId).update({
    like:updatelike
  })
}
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
      window.location = "kiwifruRoom.html";
  }
