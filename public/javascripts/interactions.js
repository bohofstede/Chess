//@ts-check
/* setTimeout(function() {
  new Audio("../data/pop.wav").play();
}, 500); */
/* ESLint global variables information */
/* global Setup, Status, Messages, Board, StatusBar, Chess */



/* basic constructor of game state */
function GameState(socket, playerType) {
    this.socket = socket;
    this.chess = new Chess();
    this.playerType = playerType;
    //chess.moves({ verbose: true });
    this.board = new Board(playerType);
    this.statusBar = new StatusBar();
};


//move sent to server or move arrives and the board is updated
this.updateGame = function(from, to) {

    console.assert(
        typeof from == "string" && typeof to == "string",
        "%s: Expecting a string",
        arguments.callee.name
    );
    console.assert(
        this.chess.move({ from: from, to: to }) !=null,
        "%s: Expecting a valid move",
        arguments.callee.name
    );


    this.board.updateBoard(this.chess.board(), this.playerType);

    var isDraw = this.chess.in_draw() || this.chess.in_stalemate() || this.chess.in_threefold_repetition();
    var isWon = this.chess.in_checkmate();

    if(isWon || isDraw)  socket.close();
};



//set everything up, including the WebSocket
(function setup() {
    var socket = new WebSocket(Setup.WEB_SOCKET_URL);

    var gs = null;

    socket.onmessage = function(event) {
        let incomingMsg = JSON.parse(event.data);

        //set player type
        if (incomingMsg.type == Messages.T_PLAYER_TYPE) {
            gs = new GameState(socket, incomingMsg.data); //should be "White" or "Black"
            return;
            /*
             let outgoingMsg = Messages.O_TARGET_WORD;
             outgoingMsg.data = res;
             socket.send(JSON.stringify(outgoingMsg));
           } else {
             sb.setStatus(Status["player2IntroNoTargetYet"]);
           } */
        }
        //Player A: wait for guesses and update the board ...
        if (
            incomingMsg.type == Messages.T_MOVE
        ) {
            gs.updateGame(incomingMsg.from, incomingMsg.to);
        }
    };

    socket.onopen = function() {
        socket.send("{}");
    };

    //server sends a close event only if the game was aborted from some side
    socket.onclose = function() {
        if (gs.whoWon() == null) {
            sb.setStatus(Status["aborted"]);
        }
    };

    socket.onerror = function() {};
})(); //execute immediately