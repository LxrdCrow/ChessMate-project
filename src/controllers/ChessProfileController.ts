import { Request, Response } from 'express';
import db from '../db/database';

export const createProfile = async (req: Request, res: Response) => {
  const { preferred_openings, rating, notes } = req.body;
  const userId = (req as any).user?.id; 

  try {
    const existingProfile = await db('chess_profiles').where({ user_id: userId }).first();
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const [id] = await db('chess_profiles').insert({
      user_id: userId,
      preferred_openings: JSON.stringify(preferred_openings),
      rating,
      notes,
    });

    return res.status(201).json({ message: 'Profile created', profileId: id });
  } catch (error) {
    console.error('Error createProfile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  try {
    const profile = await db('chess_profiles').where({ user_id: userId }).first();

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.preferred_openings = JSON.parse(profile.preferred_openings);

    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error getProfile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { preferred_openings, rating, notes } = req.body;

  try {
    const updatedData: any = {};
    if (preferred_openings) updatedData.preferred_openings = JSON.stringify(preferred_openings);
    if (rating !== undefined) updatedData.rating = rating;
    if (notes !== undefined) updatedData.notes = notes;

    const updated = await db('chess_profiles').where({ user_id: userId }).update(updatedData);

    if (!updated) {
      return res.status(404).json({ message: 'Profile not found to update' });
    }

    return res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    console.error('Error updateProfile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  try {
    const deleted = await db('chess_profiles').where({ user_id: userId }).del();

    if (!deleted) {
      return res.status(404).json({ message: 'Profile not found to delete' });
    }

    return res.status(200).json({ message: 'Profile deleted' });
  } catch (error) {
    console.error('Error deleteProfile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};




