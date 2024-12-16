import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params; // Get the user ID from the URL parameters

  try {
    // Find and delete the user by ID
    const deletedUser = await prisma.user.delete({
      where: { username: username }, // Ensure the ID is converted to a number
    });

    res.json({
      message: 'User deleted successfully',
      user: deletedUser, // Optional: return the deleted user information
    });
  } catch (error) {
    next(error);
  }
};



