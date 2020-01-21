// Makes a chessboard (excl. pieces)
function Board(playerType) {
    this.playerType = playerType;

    var chessboard = document.getElementById('chessboard');
    for (var i = 0; i < 8; i++) {
        let row = document.createElement('tr');
        row.setAttribute("class", "chessboard");
        chessboard.appendChild(row);
        for (var j = 0; j < 8; j++) {
            let cell = document.createElement('td');
            var column = 8 - i;
            var idToString = String.fromCharCode(97 + j) + column;
            cell.setAttribute("class", "chessboard " + playerType);
            row.appendChild(cell);

            // color
            // if((i + j) % 2 == 0)
            //     cell.setAttribute('class','white')
            // if((i + j) % 2 == 1)
            //     cell.setAttribute('class','black')

            cell.setAttribute('ondragstart', 'drag(event)');
            cell.setAttribute('draggable', 'true');
            cell.setAttribute('id', idToString);  // id
            cell.setAttribute('ondrop', 'drop(event)');
            cell.setAttribute('ondragover', 'allowDrop(event)');

            // cell.appendChild(content);
            // let text = document.createTextNode(idToString); // to edit the value inside each cell
            // cell.appendChild(text);
        }
    }

}


// is digit
function is_digit(c) {
    return '0123456789'.indexOf(c) !== -1;
}


Board.prototype.updateBoard = function (fen) {
    //function takes in the 2d board from the library and visualises the chessboard
    let chessboard = document.getElementById('chessboard');

    // for (let x = 0; x < 8; x++) {
    //     for (let y = 0; j < 8; y++)
    //     chessboard.rows[x].cells[y].innerHTML = "hi";
    // }

    let tokens = fen.split(/\s+/);
    let position = tokens[0];


    let row = 0;
    let cell = -1;

    for (let i = 0; i < position.length; i++) {
        let piece = position.charAt(i);

        if (piece === '/') {                                // skip to next row
            row++;
            cell = -1;
        } else if (is_digit(piece)) {                       // skip a number of cells
            //cell += parseInt(piece, 10);
            for (let j = 0; j < piece; j++) {
                cell++;
                if (cell > 8) {
                    row++;
                    cell = cell % 8;
                }
                chessboard.rows[row].cells[cell].innerHTML = "";
            }

        } else {
            let color = (piece < 'a') ? 'w' : 'b';
            // put({type: piece.toLowerCase(), color: color}, algebraic(square));
            // square++;
            cell++;
            if (cell > 8) {
                row++;
                cell = cell % 8;
            }
            chessboard.rows[row].cells[cell].innerHTML = convertToPiece(piece.toLowerCase(), color);
        }

    }
    //
    // turn = tokens[1];
    //
    // if (tokens[2].indexOf('K') > -1) {
    //     castling.w |= BITS.KSIDE_CASTLE;
    // }
    // if (tokens[2].indexOf('Q') > -1) {
    //     castling.w |= BITS.QSIDE_CASTLE;
    // }
    // if (tokens[2].indexOf('k') > -1) {
    //     castling.b |= BITS.KSIDE_CASTLE;
    // }
    // if (tokens[2].indexOf('q') > -1) {
    //     castling.b |= BITS.QSIDE_CASTLE;
    // }
    //
    // ep_square = (tokens[3] === '-') ? EMPTY : SQUARES[tokens[3]];
    // half_moves = parseInt(tokens[4], 10);
    // move_number = parseInt(tokens[5], 10);
    //
    // update_setup(generate_fen());

    ////////////////////////////////////////////



    // for (var i = 0; i < 8; i++) {
    //     for (var j = 0; j < 8; j++) {
    //         chessboard.rows[i].cells[j].innerHTML = tokens[i]; //convertToPiece(board[i][j].type, board[i][j].color);
    //     }
    // }
}


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
    let possibleSquares = chess.moves({ square: from });
    for (let i = 0; i < possibleSquares.length; i++) {
        let temp = possibleSquares[i].split("");
        if (temp.length == 2) {
            let cell = document.getElementById(possibleSquares[i]);
            console.log("Hi: possible move: " + possibleSquares[i], cell);
            cell.setAttribute('style', 'background-color: red');
            console.log("possible move: " + possibleSquares[i]);
        }
        else {
            let cell = document.getElementById(temp[temp.length - 2] + temp[temp.length - 1]);
            cell.setAttribute('style', 'background-color: red');
        }
    }
}


// Resets the colors
Board.prototype.resetColors = function (from, chess) {
    let chessboard = document.getElementById("chessboard");
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            chessboard.rows[i].cells[j].setAttribute("style", "blue");
        }
    }
}



// Board.prototype.getMove(validMoves, callback){
//     //has to activate the board and allow only valid moves to be made, then once a move is made the callback function takes the valid move as input
//
//     //
//
//         callback(from, to);
// }



// TODO: later
/*
 * Object representing the status bar.
 */

// eslint-disable-next-line no-unused-vars
function StatusBar() {
    this.setStatus = function (status) {
        document.getElementById("statusbar").innerHTML = status;
    };
}

// StatusBar.prototype.updateStatus(status){
//     //display the new status
// }
