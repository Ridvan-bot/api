// src/rateLimiter.ts
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { InMemoryStoreEntry } from '../../types/types';
import rateLimit from 'express-rate-limit';

// Create a Redis client
const redisClient = new Redis({
  host: '127.0.0.1', // Redis server address
  port: 6379,        // Redis server port
});

// In-memory fallback store for request counts
const inMemoryStore: Record<string, InMemoryStoreEntry> = {};

// Rate limit configuration
const MAX_REQUESTS = 10; // Maximum number of requests allowed
const WINDOW_SIZE = 60 * 1000; // 1-minute window

// Middleware function for rate limiting
const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip as string; // Explicitly type the IP address as a string
  const redisKey = `rate-limit:${ip}`; // Redis key to track request count per IP

  try {
    // Execute Redis commands using multi and check for errors
    const redisResponse = await redisClient
      .multi()
      .get(redisKey)
      .pttl(redisKey) // Get time to live (TTL) of the key
      .exec();

    // Handle errors and extract results safely
    const requestCount = redisResponse?.[0]?.[1];
    const resetTime = redisResponse?.[1]?.[1];

    let count = parseInt(requestCount ? requestCount.toString() : '0', 10); // Convert to number safely
    let ttl = resetTime ? parseInt(resetTime.toString(), 10) : 0; // Convert to number safely

    if (isNaN(count)) count = 0; // Fallback to 0 if Redis returns unexpected values

    // If the request count exceeds the limit, send a 429 response
    if (count >= MAX_REQUESTS) {
      return res.status(429).json({
        message: 'Too many requests, please try again later.',
        retryAfter: ttl / 1000, // Retry time in seconds
      });
    }

    // Increment the request count and set expiry if not already set
    await redisClient
      .multi()
      .incr(redisKey) // Increment the request count
      .pexpire(redisKey, WINDOW_SIZE) // Set the TTL to 1 minute if not set
      .exec();

    next(); // Call next middleware if rate limit is not exceeded
  } catch (err) {
    console.error('Redis connection error, using in-memory fallback:', err);

    // In-memory fallback logic
    const currentTime = Date.now();
    const fallbackEntry = inMemoryStore[ip]; // Access the store entry using a string key

    // Check if the IP is in the store and if the request window has expired
    if (fallbackEntry && currentTime < fallbackEntry.resetTime) {
      // If requests exceed the limit, block further requests
      if (fallbackEntry.count >= MAX_REQUESTS) {
        return res.status(429).json({
          message: 'Too many requests, please try again later.',
          retryAfter: (fallbackEntry.resetTime - currentTime) / 1000, // Retry time in seconds
        });
      }

      // Increment the request count
      fallbackEntry.count += 1;
    } else {
      // If not in the store or window has expired, reset the count
      inMemoryStore[ip] = { count: 1, resetTime: currentTime + WINDOW_SIZE };
    }

    next(); // Call next middleware if rate limit is not exceeded
  }
};

export default rateLimiter;
