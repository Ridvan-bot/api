import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await prisma.role.findMany();
      res.json(roles);
    } catch (error) {
      next(error)
    }
  };
