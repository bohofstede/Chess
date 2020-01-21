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



  function Board(playerType) {
    this.playerType = playerType;

    var chessboard = document.getElementById('chessboard');
    for (var i = 0; i < 8; i++) {
        let row = document.createElement('tr');
        row.setAttribute("class", "chessboard");
        chessboard.appendChild(row);
        for (var j = 0; j < 8; j++) {
            let cell = document.createElement('td');
            var column;
            var idToString;

            if (playerType == 'WHITE') {
               column = 8 - i;
               idToString = String.fromCharCode(97 + j) + column;
                console.log(idToString);
                console.log(i);
            }
            if (playerType == 'BLACK') {
                column = i + 1;
                idToString = String.fromCharCode(104 - j) + column;
                console.log(idToString);
                console.log(i);
            }
            cell.setAttribute("class", "chessboard " + playerType);
            row.appendChild(cell);

          

            cell.setAttribute('ondragstart', 'drag(event)');
            cell.setAttribute('draggable', 'true');
            cell.setAttribute('id', idToString);  // id
            cell.setAttribute('ondrop', 'drop(event)');
            cell.setAttribute('ondragover', 'allowDrop(event)');

            
        }
    }

}


// is digit
function is_digit(c) {
return '0123456789'.indexOf(c) !== -1;
}


Board.prototype.updateBoard = function (fen, playerType) {
    //function takes in the 2d board from the library and visualises the chessboard
    let chessboard = document.getElementById('chessboard');

    let tokens = fen.split(/\s+/);
    let position = tokens[0];


    let row = 0;
    let cell = 0;

    for (let i = 0; i < position.length; i++) {
        let piece = position.charAt(i);
        // console.log(piece);

        if (piece === '/') {                                // skip to next row
            //row++;
            cell = 0;
        } else if (is_digit(piece)) {                       // skip a number of cells
            //cell += parseInt(piece, 10);
            for (let j = 0; j < piece; j++) {
                if (playerType == 'white') {
                    chessboard.rows[row].cells[cell].innerHTML = "";
                }
                if (playerType == 'black') {
                    chessboard.rows[7 - row].cells[7 - cell].innerHTML = "";
                }

                cell++;
                if (cell >= 8) {
                    row++;
                    cell = cell % 8;
                }
            }
        } else {
            let color = (piece < 'a') ? 'w' : 'b';

            if (playerType == 'white') {
                chessboard.rows[row].cells[cell].innerHTML = convertToPiece(piece.toLowerCase(), color);
            }
            if (playerType == 'black') {
                chessboard.rows[7 - row].cells[7 - cell].innerHTML = convertToPiece(piece.toLowerCase(), color);
            }
            cell++;
            if (cell >= 8) {
                row++;
                cell = cell % 8;
            }
        }

    }
   
}

    // for (var i = 0; i < 8; i++) {
    //     for (var j = 0; j < 8; j++) {
    //         chessboard.rows[i].cells[j].innerHTML = tokens[i]; //convertToPiece(board[i][j].type, board[i][j].color);
    //     }
    // }



    // converts
function convertToPiece(string, color) {
    if (color == 'w') {
        if (string == 'k') return '&#x2654';
        if (string == 'q') return '&#x2655';
        if (string == 'r') return '&#x2656';
        if (string == 'b') return '&#x2657';
        if (string == 'n') return '&#x2658';
        if (string == 'p') return '&#x2659';
    }
    if (color == 'b') {
        if (string == 'k') return '&#x265A';
        if (string == 'q') return '&#x265B';
        if (string == 'r') return '&#x265C';
        if (string == 'b') return '&#x265D';
        if (string == 'n') return '&#x265E';
        if (string == 'p') return '&#x265F';
    }
}


//supposed to highlight which squares the selected piece can go to.
Board.prototype.showMoves = function (from, chess) {
    let possibleSquares = chess.moves({square: from});
    for (let i = 0; i < possibleSquares.length; i++) {
        let temp = possibleSquares[i].split("");
        //console.log(temp + " __ " + temp[temp.length-2]);

        if (temp.length == 2) {
            let cell = document.getElementById(possibleSquares[i]);
            //console.log("Hi: possible move: " + possibleSquares[i], cell);
            cell.setAttribute('style', 'background-color: red');
            //console.log("possible move: " + possibleSquares[i]);
        } else if (temp[temp.length - 2] == '=') {
            let cell = document.getElementById(temp[temp.length - 4] + temp[temp.length - 3]);
            cell.setAttribute('style', 'background-color: red');
        }
        else {
            let cell = document.getElementById(temp[temp.length - 2] + temp[temp.length - 1]);
            cell.setAttribute('style', 'background-color: red');
        }
    }
}