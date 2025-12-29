import type { Request, Response } from 'express';

import pool from '../db.js';

export const login = async (req: Request, res: Response)=>{
    try {
        console.log('data: ', req.body);
        if (
            !req.body.email || 
            !req.body.password || 
            req.body.email.trim() === '' || 
            req.body.password.trim() === ''
        ) {
            return res.status(400).json({ message: 'Email and password error' });
        };
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
        console.log(result.rowCount, result.rows);
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}