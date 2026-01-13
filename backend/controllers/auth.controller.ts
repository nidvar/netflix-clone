import bcrypt from 'bcryptjs';

import type { Request, Response } from 'express';

import jwt, { type JwtPayload } from 'jsonwebtoken';

import pool from '../db.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

const validateCredentials = (email: string, password: string) => {
    if (
        !email || 
        !password || 
        email.trim() === '' || 
        password.trim() === ''
    ) {
        return false;
    }else{
        return true;
    }
}

export const login = async (req: Request, res: Response)=>{
    try {

        if(validateCredentials(req.body.email, req.body.password) === false){
            return res.status(400).json({ message: 'Email and password error' });
        };

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', 
            [req.body.email]
        );

        const user = result.rows[0];

        if(!user){
            return res.status(401).json({ message: 'Invalid credentials' });
        };

        const passwordValidate = await bcrypt.compare(req.body.password, user.password);

        if(!passwordValidate){
            return res.status(401).json({ message: 'Invalid credentials' });
        };

        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken({ id: user.id });

        await pool.query(
            'UPDATE users SET refresh_token = $1 WHERE id = $2', 
            [refreshToken, user.id]
        );

        res.cookie('accessToken-nf-clone', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken-nf-clone', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
            maxAge: 3* 60 * 60 * 1000,
        });

        return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signUp = async (req: Request, res: Response)=>{
    try {
        if(validateCredentials(req.body.email, req.body.password) === false){
            return res.status(400).json({ message: 'Email and password error' });
        };

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [req.body.email]
        );

        const existingUser = result.rows[0];

        if(existingUser) {
            return res.status(500).json({ message: 'User already exists' });
        };

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const image = req.body.image || 'avatar.png';

        await pool.query(
            'INSERT INTO users (email, username, password, image) VALUES ($1, $2, $3, $4)', 
            [req.body.email, req.body.username, hashedPassword, image]
        );

        const user = {
            username: req.body.username,
            email: req.body.email,
            image: image
        }

        return res.status(201).json({ message: 'User created successfully', user: user });
    } catch (error) {
        console.error('Error in signUp controller:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = async (req: Request, res: Response)=>{
    try {

        res.clearCookie('accessToken-nf-clone', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
        });

        res.clearCookie('refreshToken-nf-clone', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
        });

        await pool.query(
            'UPDATE users SET refresh_token = NULL WHERE id = $1', 
            [res.locals.userId]
        );

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in logout controller:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const refreshTokenEndpoint = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken-nf-clone'];
        if(!refreshToken){
            return res.status(401).json({message: 'Unauthorized: No refresh token provided'});
        };
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET as string) as JwtPayload;
        if(!decodedRefreshToken){
            return res.status(401).json({message: 'Unauthorized: Invalid refresh token'});
        };
        const user = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [decodedRefreshToken.id]
        );

        if(!user){
            return res.status(401).json({message: 'Unauthorized: Invalid refresh token'});
        }

        const newAccessToken = generateAccessToken({ id: decodedRefreshToken.id });

        res.cookie('accessToken-nf-clone', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
            maxAge: 15 * 60 * 1000,
        });

        return res.status(200).json({message: 'access token refreshed'});

    } catch (error) {
        if(error instanceof Error){
            console.log(error.name)
        };
        return res.status(401).json({message: 'refreshToken error'});
    }
};

export const authCheck = async (req: Request, res: Response)=>{
    try {
        const token = req.cookies['accessToken-nf-clone'];
        if(!token){
            return res.status(401).json({message: 'Unauthorized: No token provided'});
        };
        jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return res.status(200).json({message: 'Authorized'});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'authCheck error, or invalid token'});
    }
}