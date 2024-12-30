import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { createUserGroup } from '../controllers/userGroupControllers/postUserGroupController';
import { updateUserGroup } from '../controllers/userGroupControllers/putUserGroupController';
import { deleteUserGroup } from '../controllers/userGroupControllers/deleteUserGroupController';
import { getUserGroup } from '../controllers/userGroupControllers/getUserGroupController';


 // Register routes
const router = Router();

router.get('/:group', authenticateToken, getUserGroup);
router.post('/', authenticateToken, createUserGroup)
router.delete('/', authenticateToken, deleteUserGroup);
router.put('/:userGroup', authenticateToken, updateUserGroup);

export default router;