import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile  = req.body.id;
        const profileId = parseInt(profile, 10);
      const deletrole = await prisma.profile.delete(
        {
          where: {
            id: profileId,
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
