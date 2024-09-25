"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Middleware function to validate JWT
const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token part
    // If no token, respond with an unauthorized status
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    // Verify the token using the secret key
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' }); // Forbidden if token is invalid
        }
        // Attach user information to the request object
        req.user = user;
        next(); // Call next middleware or route handler
    });
};
exports.default = authenticateToken;
