import { Router, Request, Response, NextFunction } from 'express';
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote
} from '../controllers/NoteController';
// import { verifyToken } from '../middleware/auth'; // Se vuoi proteggere le rotte

const router = Router();

// Crea una nuova nota
router.post('/notes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createNote(req, res);
  } catch (err) {
    next(err);
  }
});

// Ottieni una nota specifica
router.get('/notes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllNotes(req, res);
  } catch (err) {
    next(err);
  }
});

// Aggiorna una nota
router.put('/notes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateNote(req, res);
  } catch (err) {
    next(err);
  }
});

// Elimina una nota
router.delete('/notes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteNote(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
