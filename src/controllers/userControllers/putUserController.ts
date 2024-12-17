import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;
  const { name, email, isActive, authentication } = req.body as Prisma.UserUpdateInput;

  // Partial object to store the updated data
  const updateData: Prisma.UserUpdateInput = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (isActive) updateData.isActive = isActive;
  if (authentication) updateData.authentication = authentication;

  try {
    // Find and update the user by username
     await prisma.user.update({
      where: { username: username },
      data: updateData,
    });
    res.json({
      message: 'User updated successfully',
      user: updateData,
    });
  } catch (error) {
    next(error);
  }
}

