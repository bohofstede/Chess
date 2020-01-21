/*
 * Object representing the (un)hidden word.
 */

// eslint-disable-next-line no-unused-vars
function Board(playerType) {
    this.playerType = playerType; 
    
    //create the chessboard without the pieces
    
    }

    Board.prototype.updateBoard = function(fen){
      //function takes in the 2d board from the library and visualises the chessboard
    }
    
    const moves = [["f2","f3"],["e7","e5"],["g2","g4"],["d8","h4"]];
    var moveID = 0;

    Board.prototype.validMoves = []
    Board.prototype.callback = null

    //Has to activate the board and allow only valid moves to be made, then once a move is made the callback function takes the valid move as input
    Board.prototype.getMove = function(validMoves, callback){

      Board.prototype.validMoves = validMoves;
      Board.prototype.callback = callback;

      // Test code 
      var m = moves[moveID++ * 2 + (this.playerType == "WHITE" ? 0 : 1)];
      console.log("Playing",m[0],m[1]);
      setTimeout(function () {callback(m[0],m[1])},100);

      /* TO IMPLEMENT
      // drag/drop functions allow only valid moves 
      // and then call callback to pass back the user move
      Board.prototype.callback(from,to);

      // clear callback and validMoves
      Board.prototype.validModes = [];
      Board.prototype.callback = null;
      */
    }
    
    
    
    /*
     * Object representing the status bar.
     */
    
    // eslint-disable-next-line no-unused-vars
    function StatusBar() {
      this.setStatus = function(status) {
        document.getElementById("statusbar").innerHTML = status;
      };
    }

   
    StatusBar.prototype.updateStatus = function(statusMessageId) {
      this.setStatus(Status[statusMessageId]);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    