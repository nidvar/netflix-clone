import type { Request, Response } from 'express';

export const login = async (req:Request, res: Response)=>{
    res.send('Login Route from controller');
}