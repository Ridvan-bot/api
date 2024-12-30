import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { name } = req.body;
      const role = await prisma.role.create({
        data: {
          name: name,
        },
      });
      res.json(role);
    } catch (error) {
      next(error)
    }
  };
