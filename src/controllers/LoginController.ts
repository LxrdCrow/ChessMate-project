import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User'; 
import db from '../db/database';



const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto123';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await db<User>('users').where({ email }).first();

    if (!user) {
      return res.status(401).json({ message: 'Email o password non validi' });
    }

    // verified password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email o password non validi' });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Errore login:', error);
    return res.status(500).json({ message: 'Errore server' });
  }
};
