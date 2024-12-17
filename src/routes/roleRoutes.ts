import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { getRoles } from '../controllers/roleControllers/getRoleController';

// Register routes
const router = Router();

router.get('/', authenticateToken, getRoles);


export default router;