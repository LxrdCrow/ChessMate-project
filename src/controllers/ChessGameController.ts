import { Request, Response } from 'express';
import db from '../db/database';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      id: number;
    }
    interface Request {
      user?: User;
    }
  }
}

// Create a new chess game
export const createGame = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { opponent, color, opening, result, date, tags, comments } = req.body;

  try {
    const [id] = await db('chess_games').insert({
      user_id: userId,
      opponent,
      color,
      opening,
      result,
      date,
      tags: JSON.stringify(tags),
      comments
    });

    return res.status(201).json({ message: 'Game saved', gameId: id });
  } catch (error) {
    console.error('[createGame] Error:', error);
    return res.status(500).json({ message: 'Server error while saving game' });
  }
};


export const getAllGames = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const games = await db('chess_games').where({ user_id: userId }).select('*');

    games.forEach(game => {
      game.tags = JSON.parse(game.tags);
    });

    return res.status(200).json(games);
  } catch (error) {
    console.error('[getAllGames] Error:', error);
    return res.status(500).json({ message: 'Server error while fetching games' });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const gameId = parseInt(req.params.id);

  try {
    const game = await db('chess_games').where({ id: gameId, user_id: userId }).first();

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.tags = JSON.parse(game.tags);

    return res.status(200).json(game);
  } catch (error) {
    console.error('[getGameById] Error:', error);
    return res.status(500).json({ message: 'Server error while retrieving game' });
  }
};

// Update a chess game
export const updateGame = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const gameId = parseInt(req.params.id);
  const { opponent, color, opening, result, date, tags, comments } = req.body;

  try {
    const updatedData: any = {};
    if (opponent) updatedData.opponent = opponent;
    if (color) updatedData.color = color;
    if (opening) updatedData.opening = opening;
    if (result) updatedData.result = result;
    if (date) updatedData.date = date;
    if (tags) updatedData.tags = JSON.stringify(tags);
    if (comments) updatedData.comments = comments;

    const updated = await db('chess_games')
      .where({ id: gameId, user_id: userId })
      .update(updatedData);

    if (!updated) {
      return res.status(404).json({ message: 'Game not found to update' });
    }

    return res.status(200).json({ message: 'Game updated' });
  } catch (error) {
    console.error('[updateGame] Error:', error);
    return res.status(500).json({ message: 'Server error while updating game' });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const gameId = parseInt(req.params.id);

  try {
    const deleted = await db('chess_games')
      .where({ id: gameId, user_id: userId })
      .del();

    if (!deleted) {
      return res.status(404).json({ message: 'Game not found to delete' });
    }

    return res.status(200).json({ message: 'Game deleted' });
  } catch (error) {
    console.error('[deleteGame] Error:', error);
    return res.status(500).json({ message: 'Server error while deleting game' });
  }
};
