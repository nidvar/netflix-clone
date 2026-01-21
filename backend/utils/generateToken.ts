import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: {id: string}) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '30m' });
};

export const generateRefreshToken = (payload: {id: string}) => {
    return jwt.sign(payload, process.env.REFRESH_JWT_SECRET as string, { expiresIn: '3h' });
};