import type { Request, Response } from 'express';

import { fetchData } from '../services/tmdb.service.js';

export const moviesByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    const type = req.params.type;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`);
        return res.status(200).json({movies: data});
    } catch (error) {
        console.error('Error in popularMovies controller:', error);
        return res.status(500).json('Error fetching popular movies');
    }
}

export const trendingMovie = async (req: Request, res: Response) => {
    const type = req.params.type;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`);
        if(data.results && data.results.length > 0){
            const trendingMovie = data.results[Math.floor(Math.random() * data.results?.length)];
            return res.status(200).json({movie: trendingMovie});
        }
        return res.status(404).json('No trending movie found');
    } catch (error) {
        console.error('Error in randomTrendingMovie controller:', error);
        return res.status(500).json('Error fetching random trending movie');
    }
};

export const movieTrailer = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const type = req.params.type;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/${type}/${movieId}/videos?language=en-US`);
        console.log(data);
        return res.status(200).json({trailers: data});
    } catch (error) {
        console.error('Error in movieTrailer controller:', error);
        return res.status(500).json('Error fetching movie trailers');
    }
}

export const movieDetails = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const type = req.params.type;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/${type}/${movieId}?language=en-US`);
        return res.status(200).json({details: data});
    } catch (error) {
        console.error('Error in movieDetails controller:', error);
        return res.status(500).json('Error fetching movie details');
    }
}

export const similarMovies = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const type = req.params.type;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/${type}/${movieId}/similar?language=en-US`);
        return res.status(200).json({details: data});
    } catch (error) {
        console.error('Error in movieDetails controller:', error);
        return res.status(500).json('Error fetching movie details');
    }
}