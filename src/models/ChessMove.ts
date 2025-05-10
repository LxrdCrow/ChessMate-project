export interface ChessMove {
  id?: number; 
  game_id: number;
  move_number: number;
  notation: string; 
  annotation?: 'brilliant' | 'good' | 'inaccuracy' | 'mistake' | 'blunder' | 'none';
  comment?: string;
  created_at?: Date;
}

export interface ChessMoveWithGame extends ChessMove {
  game: {
    id: number;
    white_player: string;
    black_player: string;
    result: '1-0' | '0-1' | '1/2-1/2';
    created_at: Date;
  };
}

export interface ChessMoveWithGameAndUser extends ChessMoveWithGame {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ChessMoveWithGameAndUserAndReflections extends ChessMoveWithGameAndUser {
  reflections: {
    id: number;
    game_id: number;
    content: string;
    created_at: Date;
  }[];
}
