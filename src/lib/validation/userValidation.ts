import { check } from 'express-validator';

export const userValidationRules = [
  check('name').notEmpty().withMessage('Name is required'),
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const updateUserValidationRules = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    ];