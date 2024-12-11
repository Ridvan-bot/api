import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Controller to get user profile
export const getUserProfiles = async (req: Request, res: Response) => {
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Respond with all users
    res.json({
      message: 'All users',
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};