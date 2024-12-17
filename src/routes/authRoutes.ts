import { Router } from 'express';
import { login } from '../controllers/userControllers/postAuthController';

const router = Router();

router.post('/login', login);

export default router;