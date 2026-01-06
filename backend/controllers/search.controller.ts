import type { Request, Response } from 'express';
import { fetchData } from '../services/tmdb.service.js';

export const searchMovie = async (req: Request, res: Response)=>{
    const query = req.params.query;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        const movies = data.results;
        return res.status(200).json({movies: movies});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'search movie error'});
    }
}