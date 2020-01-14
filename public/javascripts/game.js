//var Chess = require('./chess').Chess;


var game = new Chess();

//working with webSockets
var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event){
    document.getElementById("hello").innerHTML = event.data;
};

socket.onopen = function(){
    socket.send("Hello from the client!");
    document.getElementById("hello").innerHTML = "Sending a first message to the server ...";
};



function drop(ev) {
  ev.preventDefault();
  var fromId = ev.dataTransfer.getData("start");
  var from = document.getElementById(fromId);
  var to = ev.toElement;
  var toId = to.id;
  var move = { from: fromId, to: toId }
  //console.log("drop", ev, ev.toElement.id, from, from.innerHTML, move);
  var result = game.move(move);
  if(result==null) return;
  to.innerHTML = from.innerHTML;
  from.innerHTML = "";
} 


/* function drop(ev) {
    console.log("hello");
    console.log(ev);
    ev.preventDefault();
    var from = ev.dataTransfer.getData("start");
    console.log(from);
    var to = ev.toElement.id;
    console.log(to);

   var res = chess.move({ from: from, to: to });

   if(res==null){
     console.log("result is null");
   }
   else{
     console.log("movemad");
   }

  } */

  function drag(ev) {
    ev.dataTransfer.setData("start", ev.target.id);
  }

function allowDrop(ev){
  console.log("heythere");
    ev.preventDefault();
}

