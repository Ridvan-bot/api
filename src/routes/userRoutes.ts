import { Router } from 'express';
import { 
getUserProfiles, 
getUserByUsername, 
getUsers,
 } from '../controllers/getUserController'; 
import { updateUser } from '../controllers/putUserController';
import { deleteUser } from '../controllers/deleteUserController';
import { register} from '../controllers/postUserController';
import authenticateToken from '../lib/middleware/authentication';
import registerLimiter from '../lib/middleware/registerRateLimit';
import { userValidationRules } from '../lib/validation/userValidation';
import validateRequest from '../lib/middleware/validator';


// Register routes
const router = Router();

// Apply the rate limiter and validation before the register handler
router.post('/register', registerLimiter, userValidationRules, validateRequest, register);
router.put('/profile/:username', authenticateToken, validateRequest, updateUser);
router.get('/profiles/', authenticateToken, getUserProfiles);
router.get('/profile/:username', authenticateToken, getUserByUsername);
router.get('/', authenticateToken, getUsers )
router.delete('/profile/:username', authenticateToken, deleteUser); 

export default router;
