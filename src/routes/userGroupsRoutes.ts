import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { getUserGroups } from '../controllers/userGroupControllers/getUserGroupController';

// Register routes
const router = Router();

router.get('/', authenticateToken, getUserGroups);

export default router;