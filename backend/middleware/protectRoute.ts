import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['accessToken-netflix-clone'];
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        };
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        if(!decodedToken) {
            return res.status(401).send('Unauthorized: Invalid token');
        };
        console.log('protect route passed')
        next();
    } catch (error) {
        return res.status(500).send('Internal Server Error in Protect Route Middleware');
    }
}