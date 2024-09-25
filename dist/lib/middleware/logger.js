"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Logger middleware function to log incoming HTTP requests
const logger = (req, res, next) => {
    // Record the start time when the request is received
    const start = Date.now();
    // Destructure the HTTP method and URL from the request object
    const { method, url } = req;
    // Set up an event listener on the response to log details when the response is finished
    res.on('finish', () => {
        // Calculate the duration it took to process the request
        const duration = Date.now() - start;
        // Get the HTTP status code of the response
        const status = res.statusCode;
        // Log the method, URL, status, and duration in milliseconds
        console.log(`[${new Date().toISOString()}] ${method} ${url} ${status} - ${duration}ms`);
    });
    // Call next() to pass control to the next middleware or route handler
    next();
};
exports.default = logger;
