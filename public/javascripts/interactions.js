//@ts-check
/* ESLint global variables information */
/* global Setup, Status, Messages, Board, StatusBar, Chess */

/* Game state 
   Uses the chess.js library to keep track of the chessboard state.
   We track the chessboard state on the client side to minimise client-server communication. 
*/
function GameState(socket, playerType) {
  this.socket = socket;
  this.board = new Board(playerType);
  this.statusBar = new StatusBar();
  this.playerType = playerType;
  this.chess = new Chess();

  console.log(this.playerType);

  this.updateView();
};

// returns true if the game has been won
GameState.prototype.isWon = function () {
  return this.chess.in_checkmate();
};

// returns true if the game is a draw
GameState.prototype.isDraw = function () {
  return this.chess.in_draw() || this.chess.in_stalemate() || this.chess.in_threefold_repetition();
};

// returns true if the game has finished correctly (won or drawn)
GameState.prototype.isDone = function () {
  return this.isDraw() || this.isWon();
};

//Update game state with a new move then update the view
GameState.prototype.updateState = function (from, to) {
  console.log("updateState", from, to)

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

// Do what is required based on current game state:
// - Update chessboard display
// - Determine if the game is finished (won or drawn)
// - If is not finished and it is our turn, get next move from player
GameState.prototype.updateView = function () {

  // We will need to access the game state object from a callback function later on
  var gs = this;

  this.board.updateBoard(this.chess.fen());

  var isMyTurn = this.playerType.toLowerCase().charAt(0) == this.chess.turn();
  var isDraw = this.isDraw();
  var isWon = this.isWon();
  var isDone = this.isDone();

  if (isDraw) this.statusBar.updateStatus("gameDraw");
  if (isWon) {
    var msg = Messages.O_GAME_WON_BY;
    msg.data = this.playerType;
    this.socket.send(JSON.stringify(msg));
    this.statusBar.updateStatus(isMyTurn ? "gameLost" : "gameWon");
  }
  if (isDone) {
    setTimeout(function () {
      new Audio("../data/chessMove.wav").play();
    }, 500);
    this.socket.close();
  }

  else if (isMyTurn) this.board.getMove(this.chess.moves({ verbose: true }), function (from, to) {

    var msg = Messages.O_MOVE;
    msg.from = from;
    msg.to = to;
    gs.socket.send(JSON.stringify(msg));

    gs.updateState(from, to);
  });
};

//set everything up, including the WebSocket
function setup() {
  var socket = new WebSocket("ws://localhost:" + Setup.WEB_SOCKET_PORT);

  var gs = null;

  socket.onmessage = function (event) {
    let incomingMsg = JSON.parse(event.data);

    //set player type
    if (incomingMsg.type == Messages.T_PLAYER_TYPE) {
      gs = new GameState(socket, incomingMsg.data); //should be "White" or "Black"
      return;
    };
    if (incomingMsg.type == Messages.T_MOVE) {
      gs.updateState(incomingMsg.from, incomingMsg.to);
    };
  }

  // socket.onopen = function () {
  // };

  //socket is closed if either the game was aborted or it was won from some side
  socket.onclose = function () {
    if (!gs.isDone()) {
      gs.statusBar.updateStatus("aborted");
    }
  };

  //socket.onerror = function () { };
}

setup(); //execute immediately
