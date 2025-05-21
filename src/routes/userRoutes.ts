import { Router } from 'express';
import {
  register,   
  getUser,     
  updateUser,  
  deleteUser   
} from '../controllers/UserController';

import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    await register(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    await getUser(req, res);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    await updateUser(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;

console.log(verifyToken);