import { Router, Request, Response, NextFunction } from 'express';
import { getProfile } from '../controllers/ChessProfileController';
import { ParsedQs } from 'qs';

const router = Router();

interface QueryParams extends ParsedQs {
  username?: string;
}

router.get('/chess-profile', async (req: Request<{}, any, any, QueryParams>, res: Response, next: NextFunction): Promise<void> => {
  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    res.status(400).json({ error: 'Username is required and must be a string.' });
    return;
  }

  try {
    await getProfile(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;



