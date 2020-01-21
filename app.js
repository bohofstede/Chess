var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");
var config = require("./public/javascripts/config");

var gameStatus = require("./statTracker");
var Game = require("./game");

var port = process.argv[2];
port = port ? port : config.WEB_SOCKET_PORT;

var app = express();

app.set("view engine", "ejs");
//static files to send are stored here
app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);

//TODO: move to routes/index
app.get("/", (req, res) => {
  res.render("splash.ejs", {
    gamesInitialized: gameStatus.gamesInitialized,
    gamesCompleted: gameStatus.gamesCompleted,
    movesPlayed: gameStatus.movesPlayed
  });
});

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {}; //property: websocket, value: game

/*
 * regularly clean up the websockets object
 */
setInterval(function () {
  for (let i in websockets) {
    if (Object.prototype.hasOwnProperty.call(websockets, i)) {
      let gameObj = websockets[i];
      //if the gameObj has a final status, the game is complete/aborted
      if (gameObj.finalStatus != null) {
        delete websockets[i];
      }
    }
  }
}, 50000);

var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0; //each websocket receives a unique ID

//webSocketServer passes parameter to connection(ws)
wss.on("connection", function connection(ws) {
  /*
   * two-player game: every two players are added to the same game
   */
  let con = ws;
  con.id = connectionID++;
  let playerType = currentGame.addPlayer(con);
  websockets[con.id] = currentGame;

  console.log(
    "Player %s placed in game %s as %s",
    con.id,
    currentGame.id,
    playerType
  );

  if (currentGame.hasTwoConnectedPlayers()) {

    // inform the clients about their assigned player type
    currentGame.playerWhite.send(messages.S_PLAYER_WHITE);
    currentGame.playerBlack.send(messages.S_PLAYER_BLACK);

  /*
   * once we have two players, there is no way back;
   * a new game object is created;
   * if a player now leaves, the game is aborted (player is not preplaced)
   */
    currentGame = new Game(gameStatus.gamesInitialized++);
  };

  /*
   * message coming in from a player:
   *  1. determine the game object
   *  2. determine the opposing player
   *  3. send the message to opposing player
   */
  con.on("message", function incoming(message) {
    let oMsg = JSON.parse(message);
    console.log("Message", oMsg);

    //finding the game being played
    let gameObj = websockets[con.id];
    

    if (oMsg.type == messages.T_MOVE) {
      gameStatus.movesPlayed++;
      gameObj.otherPlayer(con).send(message);
      return;
    }

    if (oMsg.type == messages.T_GAME_WON_BY) {
      gameObj.setStatus(oMsg.data);
      //game was won by somebody, update statistics
      gameStatus.gamesCompleted++;
    }
  });

  con.on("close", function (code) {
    /*
     * code 1001 means almost always closing initiated by the client;
     * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
     */
    console.log(con.id + " disconnected ...");

    if (code == "1001") {
      /*
       * if possible, abort the game; if not, the game is already completed
       */
      let gameObj = websockets[con.id];

      if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
        gameObj.setStatus("ABORTED");
        gameStatus.gamesAborted++;

        /*
         * determine whose connection remains open;
         * close it
         */
        try {
          gameObj.playerWhite.close();
          gameObj.playerWhite = null;
        } catch (e) {
          console.log("Player White closing: " + e);
        }

        try {
          gameObj.playerBlack.close();
          gameObj.playerBlacklack = null;
        } catch (e) {
          console.log("Player Black closing: " + e);
        }
      }
    }
  });
});

server.listen(port);