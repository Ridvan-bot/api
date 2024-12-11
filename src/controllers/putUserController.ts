import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();


export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { name, email, isActive, authentication } = req.body as Prisma.UserUpdateInput;

  // Partial object to store the updated data
  const updateData: Prisma.UserUpdateInput = {};

  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (isActive !== undefined) updateData.isActive = isActive;
  if (authentication !== undefined) updateData.authentication = authentication;

  try {
    console.log(updateData);
    // Find and update the user by username
    const updatedUser = await prisma.user.update({
      where: { username: username },
      data: updateData,
    });

    res.json({
      message: 'User updated successfully',
      user: updateData,
    });
  } catch (error) {
    console.error(error);

    // Type assertion to narrow down the error type
    const prismaError = error as { code?: string };

    if (prismaError.code === 'P2025') { // Prisma error code for record not found
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}

