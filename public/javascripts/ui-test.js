/*
 * Object representing the (un)hidden word.
 */

// eslint-disable-next-line no-unused-vars


    // Creates the chessboard without the pieces
    // @param playerType - black or white
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






    // Updates the html of the board.
    // @param FEN string, which is given by the Chess object which denotes the position on the board
    Board.prototype.updateBoard = function (fen) {
        //function takes in the 2d board from the library and visualises the chessboard
        let chessboard = document.getElementById('chessboard');

        let playerType = this.playerType;

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
                    if (playerType == 'WHITE') {
                        chessboard.rows[row].cells[cell].innerHTML = "";
                    }
                    if (playerType == 'BLACK') {
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

                if (playerType == 'WHITE') {
                    chessboard.rows[row].cells[cell].innerHTML = convertToPiece(piece.toLowerCase(), color);
                }
                if (playerType == 'BLACK') {
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




    // Converts a piece object into the unicode character
    // @param string - represent piece type
    // @param color - represents the color of the piece
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


    // Tests
    // const moves = [["f2", "f3"], ["e7", "e5"], ["g2", "g4"], ["d8", "h4"]];
    // var moveID = 0;




    // TODO Global Fields - still undecided on what the necessary fields are
    Board.prototype.validMoves = [];
    Board.prototype.callback = null;
    // var Chess = require('./chess').Chess; // require the chess library





    //  TODO:
    //  Has to activate the board and allow only valid moves to be made,
    //  then once a move is made the callback function takes the valid move as input
    Board.prototype.getMove = function (validMoves, callback) {

        // sets fields
        Board.prototype.validMoves = validMoves;
        Board.prototype.callback = callback;
    }


    // Checks if input is a digit
    function is_digit(c) {
        return '0123456789'.indexOf(c) !== -1;
    }



    // Test code
    // var m = moves[moveID++ * 2 + (this.playerType == "WHITE" ? 0 : 1)];
    // console.log("Playing", m[0], m[1]);
    // setTimeout(function () {
    //     callback(m[0], m[1])
    // }, 100);



    // Allows for pieces to be dropped
    function allowDrop(ev){
        // console.log("heythere");
        ev.preventDefault();
    }



    // TODO: fix drag
    // Drag event
    // Supposed to show which squares the piece can go move to,
    // and to send the original square to to the server, to register the move
    function drag(ev) {
        //let chess = new Chess(Board.prototype.fen);
        ev.dataTransfer.setData("start", ev.target.id);
        console.log(Board.prototype.validMoves);
        // Board.prototype.showMoves(ev.target.id, chess.moves(ev.target.id));
    }

    // TODO drag n drop n allowDrop
    // drag/drop functions allow only valid moves
    // and then call callback to pass back the user move
    //Board.prototype.callback(from,to);

    function drop(ev) {
        ev.preventDefault();

        //let chess = new Chess(Board.prototype.fen);
        // console.log(Board.prototype.validMoves);
        var fromId = ev.dataTransfer.getData("start");
        var from = document.getElementById(fromId);
        var to = ev.toElement;
        var toId = to.id;
        var move = [fromId, toId];
        console.log("drop", ev, ev.toElement.id, from, from.innerHTML, move);



        // var result;

        // promotion (automatic to queen)
        // let temp = toId;
        // temp.split("");
        // // console.log(temp[1]);
        // if (temp[1] == '8' || temp[1] == '1' || temp[3] == '8' || temp[3] == '1') {
        //     // console.log(temp + " ----- " + temp[3]);
        //     let promote = chess.moves(fromId); // TODO check if we can use validMoves this way
        //
        //     for (let i = 0; i < promote.length; i++) {
        //         let temp2 = promote[i];
        //         temp2.split("");
        //         if (temp2[0] + temp2[1] == toId || temp2[2] + temp2[3] == toId) {
        //             move = promote[i];  // TODO might need rework
        //             break;  // remove this line to auto promote to a knight
        //         }
        //     }
        //     // TODO: send to server, check if works
        //     Board.prototype.callback = move;
        //     result = move;

            // regular move
        // } else {
        // Send 
        for (let i = 0; i < Board.prototype.validMoves.length; i++) {
            // console.log(Board.prototype.validMoves[i].from + " - " + Board.prototype.validMoves[i].to);
            // console.log("hell");
            if (Board.prototype.validMoves[i].from == fromId && Board.prototype.validMoves[i].to == toId ) {
                const cb = Board.prototype.callback;
                Board.prototype.callback = null;
                Board.prototype.validModes = [];
                cb(move[0],move[1]);
                break;
            }
        }

        // }

        // setTimeout(function() {
        //     Board.prototype.resetColors()
        //     Board.prototype.updateBoard(fen, playerType); // TODO playerType should be set dynamically, server needs to send the updated fen
        // }, 50);

        // if(result==null) return;






    }


    // Highlights which squares the selected piece can go to.
    Board.prototype.showMoves = function (from, validMoves) {
        let possibleSquares = validMoves;
        // console.log(validMoves);
        for (let i = 0; i < possibleSquares.length; i++) {
            let temp = possibleSquares[i].split("");
            console.log(possibleSquares);
            //console.log(temp + " __ " + temp[temp.length-2]);

            if (temp.length == 2) {
                let cell = document.getElementById(possibleSquares[i]);
                //console.log("Hi: possible move: " + possibleSquares[i], cell);
                cell.setAttribute('style', 'background-color: red');
                //console.log("possible move: " + possibleSquares[i]);
            } else if (temp[temp.length - 2] == '=') {
                let cell = document.getElementById(temp[temp.length - 4] + temp[temp.length - 3]);
                cell.setAttribute('style', 'background-color: red');
            } else {
                let cell = document.getElementById(temp[temp.length - 2] + temp[temp.length - 1]);
                cell.setAttribute('style', 'background-color: red');
            }
        }
    }


    // Resets the colors, after moves have been shown
    Board.prototype.resetColors = function (from, chess) {
        let chessboard = document.getElementById("chessboard");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                chessboard.rows[i].cells[j].setAttribute("style", "blue");
            }
        }
    }


















    /*
    * Object representing the status bar.
    */

    // eslint-disable-next-line no-unused-vars
    function StatusBar() {
        this.setStatus = function (status) {
            document.getElementById("statusbar").innerHTML = status;
        };
    }


    StatusBar.prototype.updateStatus = function (statusMessageId) {
        this.setStatus(Status[statusMessageId]);
    }


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    