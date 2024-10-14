import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import welcomeRoutes from './welcomeRoutes';


const router = Router();

// Register routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/welcome', welcomeRoutes);
export default router;
