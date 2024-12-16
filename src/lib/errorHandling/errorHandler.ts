import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handling Prisma error codes
    switch (err.code) {
      case 'P2002':
        // Unique constraint failed
        const fields = err.meta?.target;
        return res.status(409).json({ message: `This value for ${fields} is already taken. Please choose another one.` });	
      case 'P2025':
        // Record not found
        return res.status(404).json({ message: 'Resource not found' });
      // Lägg till fler fall för andra felkoder
      default:
        return res.status(500).json({ message: 'Database error' });
    }
  }

  res.status(500).json({ message: 'Internal server error' });
};