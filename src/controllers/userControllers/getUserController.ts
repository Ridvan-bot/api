import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller to get user profile
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all user profiles from the database, excluding the password field
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true, 
        isActive: true,
        createdAt: true,
        updatedAt: true,
        authentication: true
      },
    });

    // Respond with all user profiles without passwords
    res.json({
      message: 'All user profiles',
      users,  // Return all the users without passwords
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username; // Get the username from the URL

  try {
    // Find the user with the given username
    const user = await prisma.user.findUnique({
      where: { username: username }, // Assuming email is used as the username
      select: {
        id: true,
        name: true, // Change to name if that’s the correct field
        username: true,
        email: true,
      },
    });

    // If the user is not found, send a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Respond with all users
    res.json({
      message: 'All users',
      users,
    });
  } catch (error) {
next(error);
  }
};