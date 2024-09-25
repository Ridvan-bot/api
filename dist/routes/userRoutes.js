"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authentication_1 = __importDefault(require("../lib/middleware/authentication"));
const registerRateLimit_1 = __importDefault(require("../lib/middleware/registerRateLimit"));
const router = (0, express_1.Router)();
// Apply the rate limiter before the register handler 
router.post('/register', registerRateLimit_1.default, userController_1.register);
router.get('/profiles/', authentication_1.default, userController_1.getAllUserProfiles);
router.get('/profile/:username', authentication_1.default, userController_1.getUserByUsername);
router.delete('/profile/:id', authentication_1.default, userController_1.deleteUser); // Define the route for deleting a user
exports.default = router;
