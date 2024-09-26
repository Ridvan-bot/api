import cors from 'cors';

// Use different CORS options based on environment
const corsOptions = {
    origin: process.env.NODE_ENV === 'PROD' ? 'https://pohlmanprotean.com' : '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);
