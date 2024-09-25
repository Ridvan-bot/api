import { Router } from 'express';
import { login } from '../controllers/userController';
import authenticateToken from '../lib/middleware/authentication';


const router = Router();
// Apply the rate limiter before the register handler

router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
  res.send('Welcome to protected API');
});

export default router;
