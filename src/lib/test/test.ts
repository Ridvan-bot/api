
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();


// Function to generate a token (you can call this when a user logs in)
const generateToken = (user: object) => {
    return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

// Example usage
const token = generateToken({ username: 'testUser' });
console.log('Generated Token:', token);
