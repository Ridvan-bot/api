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
exports.deleteUser = exports.getUserByUsername = exports.getAllUserProfiles = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        // Validate input
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Invalid input: username, password, and email are required' });
        }
        // Check if user already exists
        const existingUser = yield prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create a new user in the database
        const newUser = yield prisma.user.create({
            data: {
                name: username, // Adjust as per your User model
                email: email, // Assuming email is used as username
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = yield prisma.user.findUnique({
            where: { email: username }, // Assuming username is the email
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Validate password
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key', {
            expiresIn: '1h',
        });
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
// Controller to get user profile
const getAllUserProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all user profiles from the database, excluding the password field
        const users = yield prisma.user.findMany({
            select: {
                id: true,
                name: true, // Change to name if that’s the correct field
                // Exclude the password field by not including it in the select statement
            },
        });
        // Respond with all user profiles without passwords
        res.json({
            message: 'All user profiles',
            users, // Return all the users without passwords
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllUserProfiles = getAllUserProfiles;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username; // Get the username from the URL
    try {
        // Find the user with the given username
        const user = yield prisma.user.findUnique({
            where: { email: username }, // Assuming email is used as the username
            select: {
                id: true,
                name: true, // Change to name if that’s the correct field
            },
        });
        // If the user is not found, send a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user profile
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserByUsername = getUserByUsername;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get the user ID from the URL parameters
    try {
        // Find and delete the user by ID
        const deletedUser = yield prisma.user.delete({
            where: { id: Number(id) }, // Ensure the ID is converted to a number
        });
        res.json({
            message: 'User deleted successfully',
            user: deletedUser, // Optional: return the deleted user information
        });
    }
    catch (error) {
        console.error(error);
        // Type assertion to narrow down the error type
        const prismaError = error;
        if (prismaError.code === 'P2025') { // Prisma error code for record not found
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteUser = deleteUser;
