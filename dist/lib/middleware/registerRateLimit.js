"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/middleware/registerRateLimiter.ts
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Rate limiter for registration
const registerLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit to 5 requests per IP
    message: 'Too many accounts created from this IP, please try again later.',
});
exports.default = registerLimiter;
