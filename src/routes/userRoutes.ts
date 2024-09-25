import { Router } from 'express';
import { getAllUserProfiles, getUserByUsername, deleteUser, register } from '../controllers/userController'; 
import authenticateToken from '../lib/middleware/authentication';
import registerLimiter from '../lib/middleware/registerRateLimit';


const router = Router();
// Apply the rate limiter before the register handler 
router.post('/register', registerLimiter, register);
router.get('/profiles/', authenticateToken, getAllUserProfiles);
router.get('/profile/:username', authenticateToken, getUserByUsername);
router.delete('/profile/:id', authenticateToken, deleteUser); // Define the route for deleting a user

export default router;
