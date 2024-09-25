
import * as express from 'express';

//  extend the Request interface from Express to include the user property.
declare global {
    namespace Express {
        interface Request {
            user?: any; // You can replace 'any' with a more specific type if available
        }
    }
}