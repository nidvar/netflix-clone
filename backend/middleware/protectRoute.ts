import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { ACCESS_COOKIE } from '../utils/authConstants.js';

interface AuthPayload extends JwtPayload {
    id: string
}

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.[ACCESS_COOKIE];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        };
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
        res.locals.userId = decodedToken.id;
        next();
    } catch (error) {
        if(error instanceof Error){
            if(error.name === 'TokenExpiredError'){
                return res.status(401).json({message: 'token expired'});
            }
        };
        return res.status(500).json({message: 'Unknown Error'});
    }
}