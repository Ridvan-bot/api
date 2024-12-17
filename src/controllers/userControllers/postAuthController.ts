import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) 
  throw new Error('Required environment variables is missing');

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username: username }, // Assuming username is the email
    });

    // Validate password
    if (user && user.password && process.env.JWT_SECRET) {
      await bcrypt.compare(password, user.password);
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ message: 'Login successful', token });
  }
  } catch (error) {
    next(error);
  }
};
