import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { getGroups } from '../controllers/groupControllers/getGroupController';

// Register routes
const router = Router();

router.get('/', authenticateToken, getGroups);

export default router;