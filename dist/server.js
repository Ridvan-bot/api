"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Request and Response correctly
const express_1 = __importDefault(require("express")); // Import Request and Response correctly
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index")); // Central routes file
// Load environment variables
dotenv_1.default.config();
// Import logger middleware
const logger_1 = __importDefault(require("./lib/middleware/logger"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Use the logger middleware for all routes
app.use(logger_1.default);
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Register all routes with a common prefix
app.use('/api/v1', index_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
