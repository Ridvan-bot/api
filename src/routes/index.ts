import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import welcomeRoutes from './welcomeRoutes';
import usersRoutes from './usersRoutes';
import rolesRoutes from './rolesRoutes';
import roleRoutes from './roleRoutes';
import profileRoutes from './profileRoutes';
import profilesRoutes from './profilesRoutes';




const router = Router();

router.use('/welcome', welcomeRoutes);
router.use('/auth', authRoutes);

router.use('/users', usersRoutes);
router.use('/user', userRoutes);

router.use('/roles', rolesRoutes);
router.use('/role', roleRoutes);

router.use('/profiles', profilesRoutes);
router.use('/profile', profileRoutes);






export default router;
