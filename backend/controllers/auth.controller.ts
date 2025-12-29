import bcrypt from 'bcryptjs';

import type { Request, Response } from 'express';

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

        res.cookie('accessToken-netflix-clone', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
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
            'INSERT INTO users (email, password, image) VALUES ($1, $2, $3)', 
            [req.body.email, hashedPassword, image]
        );

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signUp controller:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};