import { Router } from 'express';
import authenticateToken from '../lib/middleware/authentication';
import { getProfiles } from '../controllers/profileControllers/getProfileController';


// Register routes
const router = Router();

router.get('/', authenticateToken, getProfiles);


export default router;