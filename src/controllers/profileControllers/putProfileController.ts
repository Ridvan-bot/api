import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.profile, 10);
    const { bio, avatarUrl } = req.body;
    const userId = parseInt(req.body.user.connect.id, 10);

    const updatedProfile = await prisma.profile.update({
      where: { id: id },
      data: {
        bio: bio,
        avatarUrl: avatarUrl,
        user: {
            connect: { id: userId },
          },
      },
    });

    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};