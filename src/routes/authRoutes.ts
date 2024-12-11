import { Router } from 'express';
import { login } from '../controllers/postAuthController';

const router = Router();

router.post('/login', login);

export default router;
