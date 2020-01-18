

var pieces = {
    //white: {
        color: 'white',
        pawn: {
            name: 'pawn',
            position: '',
            unicode: '&#x2659',
            alive: true
        },
        rook: {
            name: 'rook',
            position: '',
            unicode: '&#x2656',
            alive: true
        },
        knight: {
            name: 'knight',
            position: '',
            unicode: '&#x2658',
            alive: true
        },
        bishop: {
            name: 'bishop',
            position: '',
            unicode: '&#x2657',
            alive: true
        },
        king: {
            name: 'king',
            position: '',
            unicode: '&#x2654',
            alive: true
        },
        queen: {
            name: 'queen',
            position: '',
            unicode: '&#x2655',
            alive: true
        }
    //},

    /*black: {
        color: 'black',
        pawn: {
            name: 'pawn',
            position: '',
            unicode: '&#x265F'
        },
        rook: {
            name: 'rook',
            position: '',
            unicode: '&#x265C'
        },
        knight: {
            name: 'knight',
            position: '',
            unicode: '&#x265E'
        },
        bishop: {
            name: 'bishop',
            position: '',
            unicode: '&#&#x265D'
        },
        king: {
            name: 'king',
            position: '',
            unicode: '&#x265A'
        },
        queen: {
            name: 'queen',
            position: '',
            unicode: '&#x265B'
        }
    }*/

}


function pieces(color){
    this.setColor = function(color){this.color = color}
    if (this.color == 'black') {
        this.pawn.color += 6;
        this.rook.color += 6;
        this.knight.color += 6;
        this.bishop.color += 6;
        this.king.color += 6;
        this.queen.color += 6;
    }
    if (this.color == 'white') {

    }



}