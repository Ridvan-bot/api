import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const putRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.role;
    const newName = req.body.name;
    const roles = await prisma.role.update({
      where: { name: name },
      data: {
        name: newName,
      },
    });
    res.json(roles);
  } catch (error) {
    next(error);
  }
};