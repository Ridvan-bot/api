"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
// Create a Redis client
const redisClient = new ioredis_1.default({
    host: '127.0.0.1', // Redis server address
    port: 6379, // Redis server port
});
// In-memory fallback store for request counts
const inMemoryStore = {};
// Rate limit configuration
const MAX_REQUESTS = 10; // Maximum number of requests allowed
const WINDOW_SIZE = 60 * 1000; // 1-minute window
// Middleware function for rate limiting
const rateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const ip = req.ip; // Explicitly type the IP address as a string
    const redisKey = `rate-limit:${ip}`; // Redis key to track request count per IP
    try {
        // Execute Redis commands using multi and check for errors
        const redisResponse = yield redisClient
            .multi()
            .get(redisKey)
            .pttl(redisKey) // Get time to live (TTL) of the key
            .exec();
        // Handle errors and extract results safely
        const requestCount = (_a = redisResponse === null || redisResponse === void 0 ? void 0 : redisResponse[0]) === null || _a === void 0 ? void 0 : _a[1];
        const resetTime = (_b = redisResponse === null || redisResponse === void 0 ? void 0 : redisResponse[1]) === null || _b === void 0 ? void 0 : _b[1];
        let count = parseInt(requestCount ? requestCount.toString() : '0', 10); // Convert to number safely
        let ttl = resetTime ? parseInt(resetTime.toString(), 10) : 0; // Convert to number safely
        if (isNaN(count))
            count = 0; // Fallback to 0 if Redis returns unexpected values
        // If the request count exceeds the limit, send a 429 response
        if (count >= MAX_REQUESTS) {
            return res.status(429).json({
                message: 'Too many requests, please try again later.',
                retryAfter: ttl / 1000, // Retry time in seconds
            });
        }
        // Increment the request count and set expiry if not already set
        yield redisClient
            .multi()
            .incr(redisKey) // Increment the request count
            .pexpire(redisKey, WINDOW_SIZE) // Set the TTL to 1 minute if not set
            .exec();
        next(); // Call next middleware if rate limit is not exceeded
    }
    catch (err) {
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
        }
        else {
            // If not in the store or window has expired, reset the count
            inMemoryStore[ip] = { count: 1, resetTime: currentTime + WINDOW_SIZE };
        }
        next(); // Call next middleware if rate limit is not exceeded
    }
});
exports.default = rateLimiter;
