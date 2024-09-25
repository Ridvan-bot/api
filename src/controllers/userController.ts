
import e, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Invalid input: username, password, and email are required' });
    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name: username, // Adjust as per your User model
        email: email, // Assuming email is used as username
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { email: username }, // Assuming username is the email
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key', {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get user profile
export const getAllUserProfiles = async (req: Request, res: Response) => {
  try {
    // Fetch all user profiles from the database, excluding the password field
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true, // Change to name if that’s the correct field
        // Exclude the password field by not including it in the select statement
      },
    });

    // Respond with all user profiles without passwords
    res.json({
      message: 'All user profiles',
      users,  // Return all the users without passwords
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const username = req.params.username; // Get the username from the URL

  try {
    // Find the user with the given username
    const user = await prisma.user.findUnique({
      where: { email: username }, // Assuming email is used as the username
      select: {
        id: true,
        name: true, // Change to name if that’s the correct field
      },
    });

    // If the user is not found, send a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the user ID from the URL parameters

  try {
    // Find and delete the user by ID
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) }, // Ensure the ID is converted to a number
    });

    res.json({
      message: 'User deleted successfully',
      user: deletedUser, // Optional: return the deleted user information
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
};



