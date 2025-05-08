enum PlayerColor {
    White = 'white',
    Black = 'black',
}

type Piece = string | null;

interface IChessboard {
    squares: Piece[];
    currentPlayer: PlayerColor;
    selectedSquare: number | null;
    validMoves: number[];
    gameOver: boolean;
    reset(): void;
    selectSquare(index: number): void;
    getValidMoves(index: number): number[];
}

class Chessboard implements IChessboard {
    squares: Piece[];
    currentPlayer: PlayerColor;
    selectedSquare: number | null;
    validMoves: number[];
    gameOver: boolean;

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

    reset(): void {
        this.squares = Array(64).fill(null);
        this.currentPlayer = PlayerColor.White;
        this.selectedSquare = null;
        this.validMoves = [];
        this.gameOver = false;

        this.initializePieces();
    }

    selectSquare(index: number): void {
        if (this.gameOver) return;

        if (this.selectedSquare === index) {
            this.selectedSquare = null;
            this.validMoves = [];
        } else {
            this.selectedSquare = index;
            this.validMoves = this.getValidMoves(index);
        }
    }

    getValidMoves(index: number): number[] {
        console.log(`Calculating valid moves for square ${index}`);
        return [];
    }
}

export { Chessboard, PlayerColor, IChessboard };
