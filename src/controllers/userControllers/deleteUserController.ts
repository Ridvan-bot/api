import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params; 

  try {
    const deletedUser = await prisma.user.delete({
      where: { username: username }, 
    });

    res.json({
      message: 'User deleted successfully',
      user: deletedUser, 
    });
  } catch (error) {
    next(error);
  }
};



