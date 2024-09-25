"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Load environment variables
dotenv_1.default.config();
// Function to generate a token (you can call this when a user logs in)
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};
// Example usage
const token = generateToken({ username: 'testUser' });
console.log('Generated Token:', token);
