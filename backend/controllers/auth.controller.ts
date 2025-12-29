import bcrypt from 'bcryptjs';

import type { Request, Response } from 'express';

import pool from '../db.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

export const login = async (req: Request, res: Response)=>{
    try {
        if (
            !req.body.email || 
            !req.body.password || 
            req.body.email.trim() === '' || 
            req.body.password.trim() === ''
        ) {
            return res.status(400).json({ message: 'Email and password error' });
        };
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
        if(result.rows[0]?.email === req.body.email){
            if(req.body.password === result.rows[0]?.password){

                const accessToken = generateAccessToken({ id: result.rows[0].id });

                res.cookie('accessToken-netflix-clone', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000,
                });

                return res.status(200).json({ message: 'Login successful' });
            };
        };
        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signUp = async (req: Request, res: Response)=>{
    try {
        if (
            !req.body.email || 
            !req.body.password || 
            req.body.email.trim() === '' || 
            req.body.password.trim() === ''
        ) {
            return res.status(400).json({ message: 'Email and password error' });
        };
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [req.body.email]
        );
        if(existingUser.rowCount && existingUser.rowCount > 0) {
            return res.status(409).json({ message: 'User already exists' });
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