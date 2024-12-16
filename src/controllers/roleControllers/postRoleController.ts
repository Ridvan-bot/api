import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { name } = req.body;
      const roles = await prisma.role.create({
        data: {
          name: name,
        },
      });
      res.json(roles);
    } catch (error) {
      next(error)
    }
  };
