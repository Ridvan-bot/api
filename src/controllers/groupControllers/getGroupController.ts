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

  export const getgroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.profile, 10);
      const group = await prisma.profile.findMany(
        {
          where: {
            id: id
          }
        }
      );
      res.json({group});
    } catch (error) {
      next(error)
    }
  };
