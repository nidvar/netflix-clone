import type { Request, Response } from 'express';

import { fetchData } from '../services/tmdb.service.js';

export const popularMovies = async (req: Request, res: Response) => {
    try {
        const data = await fetchData();
        console.log(data);
        res.send('List of popular movies');
    } catch (error) {
        console.error('Error in popularMovies controller:', error);
        res.status(500).send('Error fetching popular movies');
    }
}