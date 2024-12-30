import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { createGroup } from '../controllers/groupControllers/postGroupController';
import { getGroup } from '../controllers/groupControllers/getGroupController';
import { updateGroup } from '../controllers/groupControllers/putGroupController';
import { deleteGroup } from '../controllers/groupControllers/deleteGroupController';


 // Register routes
const router = Router();

router.get('/:group', authenticateToken, getGroup);
router.post('/', authenticateToken, createGroup)
router.delete('/', authenticateToken, deleteGroup,  );
router.put('/:group', authenticateToken, updateGroup);

export default router;