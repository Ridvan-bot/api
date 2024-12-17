import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
      const deletrole = await prisma.role.delete(
        {
          where: {
            name: name,
          }
        }
      );
        res.json({
            message: 'Role deleted',
            role: deletrole
        });
    } catch (error) {
      next(error)
    }
  };
