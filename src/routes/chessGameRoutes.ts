import { Request, Response, NextFunction, Router } from 'express';
import {
  createGame,
  updateGame,
  deleteGame
} from '../controllers/ChessGameController';

const router = Router();

router.post('/chess-games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createGame(req, res);
  } catch (err) {
    next(err);
  }
});

router.put('/chess-games/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateGame(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/chess-games/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteGame(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
