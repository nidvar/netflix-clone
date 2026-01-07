import type { Request, Response } from 'express';
import { fetchData } from '../services/tmdb.service.js';

import pool from '../db.js';

export const searchPerson = async (req: Request, res: Response)=>{
    const query = req.params.query;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        const people = data.results;

        await pool.query(
            'INSERT INTO history (user_id, image, title, search_type) VALUES ($1, $2, $3, $4)', 
            [
                res.locals.userId, 
                data.results[0].profile_path, 
                data.results[0].name, 
                'person'
            ]
        );

        return res.status(200).json({people: people});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'search movie error'});
    }
}

export const searchMovie = async (req: Request, res: Response)=>{
    const query = req.params.query;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        const movies = data.results;

        await pool.query(
            'INSERT INTO history (user_id, image, title, search_type) VALUES ($1, $2, $3, $4)',
            [
                res.locals.userId, 
                data.results[0].poster_path, 
                data.results[0].title, 
                'movie'
            ]
        );

        return res.status(200).json({movies: movies});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'search movie error'});
    }
}

export const searchTVShow = async (req: Request, res: Response)=>{
    const query = req.params.query;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        const tvshows = data.results;

        await pool.query(
            'INSERT INTO history (user_id, image, title, search_type) VALUES ($1, $2, $3, $4)',
            [
                res.locals.userId, 
                data.results[0].poster_path, 
                data.results[0].name, 
                'tvshow'
            ]
        );

        return res.status(200).json({tvshows: tvshows});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'search movie error'});
    }
};

export const getSearchHistory = async (req: Request, res: Response)=>{
    try {
        const data = await pool.query(
            'SELECT * FROM history WHERE user_id = $1',
            [res.locals.userId]
        );
        return res.status(200).json({history: data.rows});
    } catch (error) {
        return res.status(401).json({message: 'getSearchHistory error'});
    }
}

export const clearHistory = async (req: Request, res: Response)=>{
    try {
        const result = await pool.query(
            'DELETE FROM history WHERE user_id = $1',
            [res.locals.userId]
        );
        return res.status(200).json({message: 'history cleared'});
    } catch (error) {
        return res.status(401).json({message: 'clearHistory error'});
    }
}

export const removeFromHistory = async (req: Request, res: Response)=>{
    try {
        const id = req.body.id;
        await pool.query(
            'DELETE FROM history WHERE id = $1 AND user_id = $2',
            [id, res.locals.userId]
        );
        return res.status(200).json({message: 'removed from history'});
    } catch (error) {
        return res.status(401).json({message: 'removeFromHistory error'});
    }
}