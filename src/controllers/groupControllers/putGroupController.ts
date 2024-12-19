import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupName = req.body.name;
    const groupId = parseInt(req.params.group, 10);

    const updatedgroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        name: groupName,
        // Below is a future implementation
        // user: {
        //     connect: { id: userId },
        //   },
      },
    });
    res.json(updatedgroup);
  } catch (error) {
    next(error);
  }
};