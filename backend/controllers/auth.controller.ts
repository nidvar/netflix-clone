import bcrypt from 'bcryptjs';

import type { Request, Response } from 'express';

import pool from '../db.js';

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
        await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, hashedPassword]
        );
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signUp controller:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};