import { Router, Request, Response } from 'express';

const router = Router();

// Define the GET route for /welcome
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, welcome to Pohlman Protean AB API!' });
});

export default router;
