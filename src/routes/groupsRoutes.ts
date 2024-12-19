import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';

// Register routes
const router = Router();

router.get('/', authenticateToken,);


export default router;