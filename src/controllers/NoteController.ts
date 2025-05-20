import { Request, Response } from 'express';
import db from '../db/database';
import { Note } from '../models/Note';

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

// Create a new note
export const createNote = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { title, content, tags } = req.body;

  try {
    const [id] = await db('notes').insert({
      user_id: userId,
      title,
      content,
      tags: JSON.stringify(tags)
    });

    return res.status(201).json({ message: 'Note saved', noteId: id });
  } catch (error) {
    console.error('[createNote] Error:', error);
    return res.status(500).json({ message: 'Server error while saving note' });
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const notes = await db('notes').where({ user_id: userId }).select('*');

    notes.forEach(note => {
      note.tags = JSON.parse(note.tags);
    });

    return res.status(200).json(notes);
  } catch (error) {
    console.error('[getAllNotes] Error:', error);
    return res.status(500).json({ message: 'Server error while fetching notes' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const noteId = req.params.id;

  try {
    const note = await db('notes').where({ id: noteId, user_id: userId }).first();

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.tags = JSON.parse(note.tags);

    return res.status(200).json(note);
  } catch (error) {
    console.error('[getNoteById] Error:', error);
    return res.status(500).json({ message: 'Server error while fetching note' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const noteId = req.params.id;
  const { title, content, tags } = req.body;

  try {
    const updatedRows = await db('notes')
      .where({ id: noteId, user_id: userId })
      .update({
        title,
        content,
        tags: JSON.stringify(tags)
      });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note updated' });
  } catch (error) {
    console.error('[updateNote] Error:', error);
    return res.status(500).json({ message: 'Server error while updating note' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const noteId = req.params.id;

  try {
    const deletedRows = await db('notes')
      .where({ id: noteId, user_id: userId })
      .del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    console.error('[deleteNote] Error:', error);
    return res.status(500).json({ message: 'Server error while deleting note' });
  }
};

