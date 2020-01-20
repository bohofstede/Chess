import { Chess } from "chess.js";

//@ts-check
/* setTimeout(function() {
  new Audio("../data/pop.wav").play();
}, 500); */
/* ESLint global variables information */
/* global Setup, Status, Messages, Board, StatusBar, Chess */



/* basic constructor of game state */
function GameState(socket, playerType) {
  this.socket = socket;
  this.board = new Board(playerType);
  this.statusBar = new StatusBar();
  this.playerType = playerType;
  this.chess = new Chess();
  
  this.updateView();
};

GameState.prototype.isWon = function(){
return this.chess.in_checkmate();
};
//move sent to server or move arrives and the board is updated
GameState.prototype.updateState = function (from, to) {
  console.assert(
    typeof from == "string" && typeof to == "string",
    "%s: Expecting a string",
    arguments.callee.name
  );



  console.assert(
    this.chess.move({ from: from, to: to }) != null,
    "%s: Expecting a valid move",
    arguments.callee.name
  );

  this.updateView();

}

GameState.prototype.updateView = function () {

  var gs = this;

  this.board.updateBoard(this.chess.board());

  var isMyTurn = this.playerType.toLowerCase().charAt(0) == this.chess.turn();
  var isDraw = this.chess.in_draw() || this.chess.in_stalemate() || this.chess.in_threefold_repetition();

  if (this.isWon() || isDraw) this.socket.close();

  if (isDraw) this.statusBar.updateStatus("It's a draw!");
  if (this.isWon()) this.statusBar.updateStatus(isMyTurn ? "gameLost" : "gameWon");


  if (isMyTurn) this.board.getMove(this.chess.moves({ verbose: true }), function (from, to) {

    var msg = Messages.O_MOVE;
    msg.from = from;
    msg.to = to;
    gs.socket.send(JSON.stringify(msg));

    gs.updateState(from, to);
  });
}






  //set everything up, including the WebSocket
  (function setup() {
    var socket = new WebSocket(Setup.WEB_SOCKET_URL);

    var gs = null;

    socket.onmessage = function (event) {
      let incomingMsg = JSON.parse(event.data);

      //set player type
      if (incomingMsg.type == Messages.T_PLAYER_TYPE) {
        gs = new GameState(socket, incomingMsg.data); //should be "White" or "Black"
        return;
      };
      if (incomingMsg.type == Messages.T_MOVE) {
        gs.updateGame(incomingMsg.from, incomingMsg.to);
      };
    }
    //boh
    socket.onopen = function () {
      socket.send("{}");
    };

    //server sends a close event only if the game was aborted from some side
    socket.onclose = function () {
      if (!gs.isWon()) {
        gs.statusBar.updateStatus("aborted");
      }
    };

    socket.onerror = function () { };
  })(); //execute immediately
