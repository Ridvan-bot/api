import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await prisma.group.findMany();
      res.json(groups);
    } catch (error) {
      next(error)
    }
  };

  export const getGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupName = req.params.group; 
      const group = await prisma.group.findMany(
        {
          where: {
            name: groupName
          }
        }
      );
      res.json({group});
    } catch (error) {
      next(error)
    }
  };
