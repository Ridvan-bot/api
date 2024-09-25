// lib/middleware/registerRateLimiter.ts
import rateLimit from 'express-rate-limit';

// Rate limiter for registration
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit to 5 requests per IP
    message: 'Too many accounts created from this IP, please try again later.',
});

export default registerLimiter;
