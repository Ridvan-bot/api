"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authentication_1 = __importDefault(require("../lib/middleware/authentication"));
const router = (0, express_1.Router)();
// Apply the rate limiter before the register handler
router.post('/login', userController_1.login);
router.get('/protected', authentication_1.default, (req, res) => {
    res.send('Welcome to protected API');
});
exports.default = router;
