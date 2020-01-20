/* every game has two players, identified by their WebSocket */
function makeBoard(size) {
    var chessboard = document.getElementById('chessboard');
    for(var i = 0; i < size; i++) {
      let row = document.createElement('tr');
      row.setAttribute("class", "chessboard");
      chessboard.appendChild(row);
      for(var j = 0; j < size; j++) {
        let cell = document.createElement('td');
        var column = 8 - i;
        var idToString = String.fromCharCode(97 + j) + column;
        cell.setAttribute("class", "chessboard");
        row.appendChild(cell);
  
       // let content = document.createElement('div');
        cell.setAttribute('ondragstart', 'drag(event)');
        cell.setAttribute('draggable', 'true');
        cell.setAttribute('id', 'idToString');  // id
        cell.setAttribute('ondrop', 'drop(event');
        cell.setAttribute('ondragover', 'allowDrop(event)');
        // cell.appendChild(content);
  
        let text = document.createTextNode(idToString); // to edit the value inside each cell
        cell.appendChild(text);
    }
  }
  // Adds the pieces to a chessboard
  // function setupPieces() {
  //   var chessboard = document.getElementById('chessboard');
  //   var placement = chess.board();
  //
  //   for (var i = 0; i < 8; i++) {
  //     for (var j = 0; j <8; j++) {
  //
  //       chessboard.rows[i].cells[j].innerHTML = "<span ondragstart='drag(event)' draggable='true' id='a3' ondrop='drop(event)' ondragover='allowDrop(event)'"placement[i][j];
  //
  //     }
  // }
  
  
    // var pieces = document.
    // var piecesBlack = {}
    // var board = [size][size];
    // for (var i = 0; i < size; i++) {
    //   for (var j = 0; j < size; j++) {
    //     if (color == 'white') {
    //       chessboard.rows[i].cells[j] =
    //     } else {
    //
    //     }
    //   }
    //   chessboard.rows[i].cells[j];
    // }
  }
  
  
  
  
  
  var chess = new Chess();
  
  
  
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
    if (temp[1] == '8' || temp[1] == '1') {
      let promote = chess.moves({square: fromId});
  
      for (let i = 0; i < promote.length; i++) {
        let temp2 = promote[i];
        temp2.split("");
        if (temp2[0] + temp2[1] == toId) {
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
      Board.prototype.updateBoard(chess.fen());
    }, 50);
  
    if(result==null) return;
  } 
  
    function drag(ev) {
      ev.dataTransfer.setData("start", ev.target.id);
      Board.prototype.showMoves(ev.target.id, chess);
    }
  
  function allowDrop(ev){
    console.log("heythere");
      ev.preventDefault();
  }