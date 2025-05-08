"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerColor = exports.Chessboard = void 0;
var PlayerColor;
(function (PlayerColor) {
    PlayerColor["White"] = "white";
    PlayerColor["Black"] = "black";
})(PlayerColor || (exports.PlayerColor = PlayerColor = {}));
class Chessboard {
    constructor() {
        this.squares = Array(64).fill(null);
        this.currentPlayer = PlayerColor.White;
        this.selectedSquare = null;
        this.validMoves = [];
        this.gameOver = false;
        this.initializePieces();
    }
    initializePieces() {
        this.squares[0] = 'wR';
        this.squares[1] = 'wN';
        this.squares[2] = 'wB';
        // ...
        this.squares[63] = 'bR';
    }
    reset() {
        this.squares = Array(64).fill(null);
        this.currentPlayer = PlayerColor.White;
        this.selectedSquare = null;
        this.validMoves = [];
        this.gameOver = false;
        this.initializePieces();
    }
    selectSquare(index) {
        if (this.gameOver)
            return;
        if (this.selectedSquare === index) {
            this.selectedSquare = null;
            this.validMoves = [];
        }
        else {
            this.selectedSquare = index;
            this.validMoves = this.getValidMoves(index);
        }
    }
    getValidMoves(index) {
        console.log(`Calculating valid moves for square ${index}`);
        return [];
    }
}
exports.Chessboard = Chessboard;
