export interface ChessProfile {
  id: string;
    username: string;
    avatar: string;
    title: string;
    country: string;
    fide_rating: number;
    rapid_rating: number;
    blitz_rating: number;
    bullet_rating: number;
    total_games: number;
    win_rate: number;
    platform: 'lichess' | 'chess.com';
    favorite_opening: string;
    preferred_color: 'white' | 'black';
    created_at: Date;
    updated_at: Date;
}

export interface ChessProfileUpdate {
  username?: string;
  avatar?: string;
  title?: string;
  country?: string;
  fide_rating?: number;
  rapid_rating?: number;
  blitz_rating?: number;
  bullet_rating?: number;
  total_games?: number;
  win_rate?: number;
  platform?: 'lichess' | 'chess.com';
  favorite_opening?: string;
  preferred_color?: 'white' | 'black';
}

