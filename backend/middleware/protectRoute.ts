import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['accessToken-netflix-clone'];
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        };
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if(!decodedToken) {
            return res.status(401).send('Unauthorized: Invalid token');
        };
        console.log('protect route passed');
        res.locals.userId = decodedToken.id;
        next();
    } catch (error) {
        if(error instanceof Error){
            if(error.name === 'TokenExpiredError'){
                return res.status(500).send({message: 'token expired'});
            }
        };
        return res.status(500).send({message: 'Unknown Error'});
    }
}