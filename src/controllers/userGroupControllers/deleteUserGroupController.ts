import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteUserGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userGroup  = req.body.id;
        const userGroupId = parseInt(userGroup, 10);
      const deleteUserGroup = await prisma.userGroup.delete(
        {
          where: {
            id: userGroupId,
          }
        }
      );
        res.json({
            message: 'userGroup deleted',
            userGroup: deleteUserGroup
        });
    } catch (error) {
      next(error)
    }
  };
