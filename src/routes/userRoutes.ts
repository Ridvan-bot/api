import { Router } from 'express';
import { 
getUserByUsername, 
 } from '../controllers/userControllers/getUserController'; 
import { updateUser } from '../controllers/userControllers/putUserController';
import { deleteUser } from '../controllers/userControllers/deleteUserController';
import { register} from '../controllers/userControllers/postUserController';
import authenticateToken from '../lib/middleware/authentication';
import registerLimiter from '../lib/middleware/registerRateLimit';
import { 
    userValidationRules,
    updateUserValidationRules
 } from '../lib/validation/userValidation';
import validateRequest from '../lib/middleware/validate';

// Register routes
const router = Router();

// Apply the rate limiter and validation before the register handler
router.post('/register', registerLimiter, userValidationRules, validateRequest, register);
router.put('/:username', updateUserValidationRules, authenticateToken, validateRequest, updateUser);
router.get('/:username', authenticateToken, getUserByUsername);
router.delete('/:username', authenticateToken, deleteUser); 

export default router;
