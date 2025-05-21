import { Router, Request, Response, NextFunction } from 'express';
import { login } from '../controllers/LoginController';

const router = Router();

// POST /login
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error('Error in login route:', error);
    next(error);
  }
});

export default router;



