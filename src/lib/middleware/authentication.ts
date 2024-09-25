import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Middleware function to validate JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token part

    // If no token, respond with an unauthorized status
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' }); // Forbidden if token is invalid
        }

        // Attach user information to the request object
        req.user = user;
        next(); // Call next middleware or route handler
    });
};

export default authenticateToken;