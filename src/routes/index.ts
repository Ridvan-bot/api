import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import welcomeRoutes from './welcomeRoutes';
import usersRoutes from './usersRoutes';
import roles from './roleRoutes';
import role from './roleRoute';

const router = Router();

router.use('/welcome', welcomeRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/user', userRoutes);
router.use('/roles', roles);
router.use('/role', role);




export default router;
