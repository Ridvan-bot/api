import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userGroups = await prisma.userGroup.findMany();
      res.json(userGroups);
    } catch (error) {
      next(error)
    }
  };

  export const getUserGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userGroupIdReq = req.params.group;
      const userGroupId = parseInt(userGroupIdReq, 10);
      const userGroup = await prisma.userGroup.findMany(
        {
          where: {
           id: userGroupId
          }
        }
      );
      res.json({userGroup});
    } catch (error) {
      next(error)
    }
  };
