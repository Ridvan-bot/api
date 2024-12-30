import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { getRole } from '../controllers/roleControllers/getRoleController';
import { createRole } from '../controllers/roleControllers/postRoleController';
import { deleteRole } from '../controllers/roleControllers/deleteRoleController';
import { updateRole } from '../controllers/roleControllers/putRoleController';
// Register routes
const router = Router();

router.get('/:role', authenticateToken, getRole);
router.post('/', authenticateToken, createRole);
router.delete('/', authenticateToken, deleteRole);
router.put('/:role', authenticateToken, updateRole);

export default router;