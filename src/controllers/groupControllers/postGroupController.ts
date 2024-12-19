import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { bio, avatarUrl } = req.body;
  const userId = req.body.user.connect.id;
  try {
    // Verify that the user exists
     await prisma.user.findUnique({
      where: { id: userId },
    });

    // create a profile for the user
    const profile = await prisma.profile.create({
      data: {
        bio: bio,
        avatarUrl: avatarUrl,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    next(error);
  }
};