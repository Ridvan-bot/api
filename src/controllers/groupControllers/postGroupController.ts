import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // create a group
    const group = await prisma.group.create({
      data: {
        name: req.body.name,
        // Below is a future implementation
        // userGroups: {
        //   connect: { },
        // },
      },
    });

    res.status(201).json({ message: 'group created successfully', group });
  } catch (error) {
    next(error);
  }
};