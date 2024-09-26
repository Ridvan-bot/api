import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Middleware to handle validation
// This middleware checks if the validation results are empty. 
//If not, it returns a 400 Bad Request with the list of validation errors.
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export default validateRequest;

