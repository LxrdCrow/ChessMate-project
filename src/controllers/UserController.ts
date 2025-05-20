import { Request, Response } from 'express';
import db from '../db/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// User Registration and Authentication Controller
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const [id] = await db('users').insert({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully', userId: id });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await db('users').where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error getUser:', error);
    return res.status(500).json({ message: 'Error server' });
  }
};

// User update controller 
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  try {
    const updatedData: any = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = bcrypt.hashSync(password, 10);

    const updated = await db('users').where({ id: userId }).update(updatedData);

    if (!updated) {
      return res.status(404).json({ message: 'User not found to update' });
    }

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updateUser:', error);
    return res.status(500).json({ message: 'Error server' });
  }
};

// Delete user controller
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deleted = await db('users').where({ id: userId }).del();

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleteUser:', error);
    return res.status(500).json({ message: 'Error server' });
  }
};