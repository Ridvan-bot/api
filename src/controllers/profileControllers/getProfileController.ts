import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profiles = await prisma.profile.findMany();
      res.json(profiles);
    } catch (error) {
      next(error)
    }
  };

  export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.profile, 10);
      const profile = await prisma.profile.findMany(
        {
          where: {
            id: id
          }
        }
      );
      res.json({profile});
    } catch (error) {
      next(error)
    }
  };
