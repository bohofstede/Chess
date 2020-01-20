// Game.js
// Client-side

// var Chess = require('./chess').Chess;
//
// var chess = new Chess();


// Makes a chessboard (excl. pieces)
function makeBoard(size) {
  var chessboard = document.getElementById('chessboard');
  for(var i = 0; i < size; i++) {
    let row = document.createElement('tr');
    row.setAttribute("class", "chessboard");
    chessboard.appendChild(row);
    for(var j = 0; j < size; j++) {
      let cell = document.createElement('td');
      var column = 8 - i;
      var idToString = String.fromCharCode(97 + j) + column;
      cell.setAttribute("class", "chessboard");
      row.appendChild(cell);

     // let content = document.createElement('div');
      cell.setAttribute('ondragstart', 'drag(event)');
      cell.setAttribute('draggable', 'true');
      cell.setAttribute('id', 'idToString');  // id
      cell.setAttribute('ondrop', 'drop(event');
      cell.setAttribute('ondragover', 'allowDrop(event)');
      // cell.appendChild(content);

      let text = document.createTextNode(idToString); // to edit the value inside each cell
      cell.appendChild(text);
  }
}
// Adds the pieces to a chessboard
// function setupPieces() {
//   var chessboard = document.getElementById('chessboard');
//   var placement = chess.board();
//
//   for (var i = 0; i < 8; i++) {
//     for (var j = 0; j <8; j++) {
//
//       chessboard.rows[i].cells[j].innerHTML = "<span ondragstart='drag(event)' draggable='true' id='a3' ondrop='drop(event)' ondragover='allowDrop(event)'"placement[i][j];
//
//     }
// }


  // var pieces = document.
  // var piecesBlack = {}
  // var board = [size][size];
  // for (var i = 0; i < size; i++) {
  //   for (var j = 0; j < size; j++) {
  //     if (color == 'white') {
  //       chessboard.rows[i].cells[j] =
  //     } else {
  //
  //     }
  //   }
  //   chessboard.rows[i].cells[j];
  // }
}





var chess = new Chess();



function drop(ev) {
  ev.preventDefault();
  var fromId = ev.dataTransfer.getData("start");
  var from = document.getElementById(fromId);
  var to = ev.toElement;
  var toId = to.id;
  var move = { from: fromId, to: toId }
  //console.log("drop", ev, ev.toElement.id, from, from.innerHTML, move);

  var result;

  // promotion (automatic to queen)
   let temp = toId;
   temp.split("");
   console.log(temp[1]);
  if (temp[1] == '8' || temp[1] == '1' || temp[3] == '8' || temp[3] == '1') {
    console.log(temp + " ----- " + temp[3]);
    let promote = chess.moves({square: fromId});

    for (let i = 0; i < promote.length; i++) {
      let temp2 = promote[i];
      temp2.split("");
      if (temp2[0] + temp2[1] == toId || temp2[2] + temp2[3] == toId) {
        move = promote[i];
        break;  // remove this line to auto promote to a knight
      }
    }
    result = chess.move(move);
    // TODO: send to server

    // regular move
  } else {
    result = chess.move(move);
    // TODO: send to server

  }

  setTimeout(function() {
    Board.prototype.resetColors()
    Board.prototype.updateBoard(chess.fen(), 'white'); // TODO playerType should be set dynamically
  }, 50);

  if(result==null) return;
} 

  function drag(ev) {
    ev.dataTransfer.setData("start", ev.target.id);
    Board.prototype.showMoves(ev.target.id, chess);
  }

function allowDrop(ev){
  console.log("heythere");
    ev.preventDefault();
}


/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                          Copied over
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

/* every game has two players, identified by their WebSocket */


var game = function (gameID) {
  this.playerWhite = null;
  this.playerBlack = null;
  this.id = gameID;
  this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
};

/*
 * The game can be in a number of different states.
 */
game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["WHITE TURN"] = 3;
game.prototype.transitionStates["BLACK TURN"] = 4;
game.prototype.transitionStates["WHITE"] = 5; //White won
game.prototype.transitionStates["BLACK"] = 6; //Black won
game.prototype.transitionStates["DRAW"] = 7;
game.prototype.transitionStates["ABORTED"] = 8;

/*
 * Not all game states can be transformed into each other;
 * the matrix contains the valid transitions.
 * They are checked each time a state change is attempted.
 */
game.prototype.transitionMatrix = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0], //0 JOINT
  [1, 0, 1, 0, 0, 0, 0, 0, 0], //1 JOINT
  [0, 0, 0, 1, 0, 0, 0, 0, 1], //2 JOINT (note: once we have two players, there is no way back!)
  [0, 0, 0, 0, 1, 1, 0, 1, 1], //3 WHITE TURN
  [0, 0, 0, 1, 0, 0, 1, 1, 1], //4 BLACK TURN
  [0, 0, 0, 0, 0, 0, 0, 0, 0], //5 WHITE WON
  [0, 0, 0, 0, 0, 0, 0, 0, 0], //6 BLACK WON
  [0, 0, 0, 0, 0, 0, 0, 0, 0], //7 DRAW
  [0, 0, 0, 0, 0, 0, 0, 0, 0] //8 ABORTED
];

game.prototype.isValidTransition = function (from, to) {
  console.assert(
      typeof from == "string",
      "%s: Expecting a string, got a %s",
      arguments.callee.name,
      typeof from
  );
  console.assert(
      typeof to == "string",
      "%s: Expecting a string, got a %s",
      arguments.callee.name,
      typeof to
  );
  console.assert(
      from in game.prototype.transitionStates == true,
      "%s: Expecting %s to be a valid transition state",
      arguments.callee.name,
      from
  );
  console.assert(
      to in game.prototype.transitionStates == true,
      "%s: Expecting %s to be a valid transition state",
      arguments.callee.name,
      to
  );

  let i, j;
  if (!(from in game.prototype.transitionStates)) {
    return false;
  } else {
    i = game.prototype.transitionStates[from];
  }

  if (!(to in game.prototype.transitionStates)) {
    return false;
  } else {
    j = game.prototype.transitionStates[to];
  }

  return game.prototype.transitionMatrix[i][j] > 0;
};

game.prototype.isValidState = function (s) {
  return s in game.prototype.transitionStates;
};

game.prototype.setStatus = function (w) {
  console.assert(
      typeof w == "string",
      "%s: Expecting a string, got a %s",
      arguments.callee.name,
      typeof w
  );

  if (
      game.prototype.isValidState(w) &&
      game.prototype.isValidTransition(this.gameState, w)
  ) {
    this.gameState = w;
    console.log("[STATUS] %s", this.gameState);
  } else {
    return new Error(
        "Impossible status change from %s to %s",
        this.gameState,
        w
    );
  }
};

/* game.prototype.doMove = function (from, to) {
  console.assert(
    typeof from == "string" && typeof to == "string",
    "invalid move"
  );

  //two possible options for the current game state:
  //1 JOINT, 2 JOINT
  if (this.gameState != "1 JOINT" && this.gameState != "2 JOINT") {
    return new Error(
      "Trying to set word, but game status is %s",
      this.gameState
    );
  }
  this.wordToGuess = w;
}; */


game.prototype.hasTwoConnectedPlayers = function () {
  return this.gameState == "2 JOINT";
};


game.prototype.nextPlayer = function () {
  if (this.gameState == "BLACK TURN"){
    this.setStatus("WHITE TURN");
    return this.playerWhite;
  }

  if (this.gameState == "WHITE TURN"){
    this.setStatus("BLACK TURN");
    return this.playerBlack;
  }

  return new Error(
      "Invalid call to nextPlayer, current state is %s",
      this.gameState
  );


};



game.prototype.addPlayer = function (p) {
  console.assert(
      p instanceof Object,
      "%s: Expecting an object (WebSocket), got a %s",
      arguments.callee.name,
      typeof p
  );

  if (this.gameState != "0 JOINT" && this.gameState != "1 JOINT") {
    return new Error(
        "Invalid call to addPlayer, current state is %s",
        this.gameState
    );
  }

  /*
   * revise the game state
   */

  var error = this.setStatus("1 JOINT");
  if (error instanceof Error) {
    this.setStatus("2 JOINT");
  }

  if (this.playerWhite == null) {
    this.playerWhite = p;
    return "WHITE";
  } else {
    this.playerBlack = p;
    return "BLACK";
  }




};

module.exports = game;