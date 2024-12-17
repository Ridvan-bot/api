import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { getRole } from '../controllers/roleControllers/getRoleController';
import { postRole } from '../controllers/roleControllers/postRoleController';
import { deleteRole } from '../controllers/roleControllers/deleteRoleController';
import { putRole } from '../controllers/roleControllers/putRoleController';
// Register routes
const router = Router();

router.get('/:role', authenticateToken, getRole);
router.post('/', authenticateToken, postRole);
router.delete('/', authenticateToken, deleteRole);
router.put('/:role', authenticateToken, putRole);

export default router;