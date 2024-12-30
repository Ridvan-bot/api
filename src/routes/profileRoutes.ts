import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { createProfile } from '../controllers/profileControllers/postProfileController';
import { getProfile } from '../controllers/profileControllers/getProfileController';
import { updateProfile } from '../controllers/profileControllers/putProfileController';
import { deleteProfile } from '../controllers/profileControllers/deleteProfileController';

// Register routes
const router = Router();

router.get('/:profile', authenticateToken, getProfile);
router.post('/', authenticateToken, createProfile)
router.delete('/', authenticateToken, deleteProfile,  );
router.put('/:profile', authenticateToken, updateProfile);

export default router;