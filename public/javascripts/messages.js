(function (exports) {
    /*
     * Client to server: game is complete, the winner is ...
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY = {
      type: exports.T_GAME_WON_BY,
      data: null
    };
  
    /*
     * Server to client: abort game (e.g. if second player exited the game)
     */
    // exports.O_GAME_ABORTED = {
    //   type: "GAME-ABORTED"
    // };
    // exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);
    
    /*
     * Server to client: set as player white
     */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
  
    exports.O_PLAYER_WHITE = {
      type: exports.T_PLAYER_TYPE,
      data: "WHITE"
    };
    exports.S_PLAYER_WHITE = JSON.stringify(exports.O_PLAYER_WHITE);
  
    /*
     * Server to client: set as player black
     */
    exports.O_PLAYER_BLACK = {
      type: exports.T_PLAYER_TYPE,
      data: "BLACK"
    };
    exports.S_PLAYER_BLACK = JSON.stringify(exports.O_PLAYER_BLACK);
  
  
    // Bidirectional message, a move has been played
    exports.T_MOVE = "MOVE";
    exports.O_MOVE = {
      type: exports.T_MOVE,
      from: null,
      to: null
    };
  
    /*
     * Server to Player  & B: game over with result won/loss
    //  */
    // exports.T_GAME_OVER = "GAME-OVER";
    // exports.O_GAME_OVER = {
    //   type: exports.T_GAME_OVER,
    //   data: null
    // };
  })(typeof exports === "undefined" ? (this.Messages = {}) : exports);
  //if exports is undefined, we are on the client; else the server
  