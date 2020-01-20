/*
 * Object representing the (un)hidden word.
 */

// eslint-disable-next-line no-unused-vars
function Board(playerType) {
    this.playerType = playerType; 
    
    //create the chessboard without the pieces
    
    }
    
    Board.prototype.updateBoard = function(board){
      //function takes in the 2d board from the library and visualises the chessboard
    }
    
    Board.prototype.getMove = function(validMoves, callback){
      //has to activate the board and allow only valid moves to be made, then once a move is made the callback function takes the valid move as input
    
      //
    callback(from, to);
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
    
    StatusBar.prototype.updateStatus = function(statusMessageId){
      //display the new status
    }
    
    
    
    