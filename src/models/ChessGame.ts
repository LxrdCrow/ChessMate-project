export interface ChessGame {
    id: number;
    userId: number;             
    opponentName: string;       
    colorPlayed: 'white' | 'black';
    opening?: string;
    result: 'win' | 'loss' | 'draw';
    comments?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
    moves?: ChessMove[];        
}

export interface ChessMove {
    id?: number;
    gameId?: number;
    moveNumber: number;
    move: string;
}


