// Import Request and Response correctly
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import { errorHandler } from './lib/errorHandling/errorHandler';


// Load environment variables
dotenv.config();

if (
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

// Register all routes with a common prefix
app.use('/api/v1', routes); 

app.use((req, res, next) => {
 res.status(404).json({ message: 'Resource not found' });
 });

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v1/welcome`);
});
