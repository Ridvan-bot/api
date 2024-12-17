import {Request, Response, NextFunction} from 'express';

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({message: 'Unauthorized'});
    }
  };
};