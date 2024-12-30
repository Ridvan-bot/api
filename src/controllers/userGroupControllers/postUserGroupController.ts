import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Create a new userGroup
    const user = req.body.user.connect.id;
    const group = req.body.group.connect.id;
    const userId = parseInt(user, 10);
    const groupId = parseInt(group, 10);

    const userGroup = await prisma.userGroup.create({
      data: {
        user: {
          connect: { id: userId },
        },
        group: {
          connect: { id: groupId },
        },
      },
    });

    res.status(201).json({ message: 'userGroup created successfully', userGroup });
  } catch (error) {
    next(error);
  }
};