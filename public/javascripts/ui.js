/*
 * Object representing the (un)hidden word.
 */

// eslint-disable-next-line no-unused-vars


//create the chessboard without the pieces

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
                cell.setAttribute("class", "chessboard");
                row.appendChild(cell);

                // color
                // if((i + j) % 2 == 0)
                //     cell.setAttribute('class','white')
                // if((i + j) % 2 == 1)
                //     cell.setAttribute('class','black')

                cell.setAttribute('ondragstart', 'drag(event)');
                cell.setAttribute('draggable', 'true');
                cell.setAttribute('id', 'idToString');  // id
                cell.setAttribute('ondrop', 'drop(event');
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
        var chessboard = document.getElementById('chessboard');
//////////////////////
        var tokens = fen.split(/\s+/);
        var position = tokens[0];
        // var square = 0;

        var row = 0;
        var cell = -1;

        for (var i = 0; i < position.length; i++) {
            var piece = position.charAt(i);

            if (piece === '/') {                                // skip to next row
                row++;
                cell = -1;
            } else if (is_digit(piece)) {                       // skip a number of cells
                cell += parseInt(piece, 10);
                if (cell > 8) {
                    row++;
                    cell = cell % 8;
                }
            } else {
                var color = (piece < 'a') ? 'w' : 'b';
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


// Board.prototype.getMove(validMoves, callback){
//     //has to activate the board and allow only valid moves to be made, then once a move is made the callback function takes the valid move as input
//
//     //
//     callback(from, to);
// }

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








// Testing

// // var Chess = require('./chess').Chess;
//     var chess = new Chess();
//
//
//     Board.prototype.updateBoard(chess.generate_fen());
