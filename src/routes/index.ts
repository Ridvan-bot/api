import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import welcomeRoutes from './welcomeRoutes';
import roles from './roleRoutes';



const router = Router();

router.use('/welcome', welcomeRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roles);


export default router;
