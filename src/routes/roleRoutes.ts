import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { getRoles } from '../controllers/roleControllers/getRoleController';
import { postRoles } from '../controllers/roleControllers/postRoleController';
import { deleteRoles } from '../controllers/roleControllers/deleteRoleController';

// Register routes
const router = Router();

router.get('/', authenticateToken, getRoles);
router.post('/', authenticateToken, postRoles);
router.delete('/', authenticateToken, deleteRoles);

export default router;