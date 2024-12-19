import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group  = req.body.id;
        const groupId = parseInt(group, 10);
      const deleteGroup = await prisma.group.delete(
        {
          where: {
            id: groupId,
          }
        }
      );
        res.json({
            message: 'Group deleted',
            group: deleteGroup
        });
    } catch (error) {
      next(error)
    }
  };
