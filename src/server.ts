// Import Request and Response correctly
import express, { Request, Response } from 'express'; // Import Request and Response correctly
import dotenv from 'dotenv';
import routes from './routes/index'; // Central routes file
import corsMiddleware from './lib/middleware/cors'; // Import the CORS middleware

// Load environment variables
dotenv.config();

if (
    !process.env.JWT_SECRET ||
    !process.env.DATABASE_URL ||
    !process.env.PORT
)
    throw new Error('Required environment variables is missing');

// Import logger middleware
import logger from './lib/middleware/logger';

const app = express();  
const PORT = process.env.PORT;

// Use the logger middleware for all routes
app.use(logger);

// Middleware to parse JSON request bodies
app.use(express.json());

// Use CORS middleware
app.use(corsMiddleware);

// Register all routes with a common prefix
app.use('/api/v1', routes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
