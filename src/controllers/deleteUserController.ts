import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const deleteUser = async (req: Request, res: Response) => {
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
    console.error(error);

    // Type assertion to narrow down the error type
    const prismaError = error as { code?: string };

    if (prismaError.code === 'P2025') { // Prisma error code for record not found
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};



