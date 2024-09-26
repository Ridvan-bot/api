import { Router } from 'express';
import { getAllUserProfiles, getUserByUsername, deleteUser, register } from '../controllers/userController'; 
import authenticateToken from '../lib/middleware/authentication';
import registerLimiter from '../lib/middleware/registerRateLimit';
import { userValidationRules } from '../lib/validation/userValidation';
import validateRequest from '../lib/middleware/validator';

// Register routes
const router = Router();

// Apply the rate limiter and validation before the register handler
router.post('/register', registerLimiter, userValidationRules, validateRequest, register);

router.get('/profiles/', authenticateToken, getAllUserProfiles);

router.get('/profile/:username', authenticateToken, getUserByUsername);

router.delete('/profile/:username', authenticateToken, deleteUser); // Define the route for deleting a user

export default router;
