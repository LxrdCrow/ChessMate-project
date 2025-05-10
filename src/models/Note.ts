import { User } from './User'; 

export interface Note {
    id: number;
    user_id: number;
    title: string;
    rating: number;
    color: string;
    game_id: number;
    game_result: string;
    game_date: Date;
    game_opponent: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    tags: string;
    is_private: boolean;
    is_deleted: boolean;
    is_archived: boolean;
}

export interface NoteWithUser extends Note {
    user: User;
}



