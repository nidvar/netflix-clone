import type { Request, Response } from 'express';

import { fetchData } from '../services/tmdb.service.js';

export const popularMovies = async (req: Request, res: Response) => {
    try {
        const data = await fetchData();
        return res.status(200).send({movies: data});
    } catch (error) {
        console.error('Error in popularMovies controller:', error);
        return res.status(500).send('Error fetching popular movies');
    }
}

export const trendingMovie = async (req: Request, res: Response) => {
    try {
        const data = await fetchData('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        if(data.results && data.results.length > 0){
            const trendingMovie = data.results[0];
            return res.status(200).send({movie: trendingMovie});
        }
        return res.status(404).send('No trending movie found');
    } catch (error) {
        console.error('Error in randomTrendingMovie controller:', error);
        return res.status(500).send('Error fetching random trending movie');
    }
};

export const movieTrailer = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    try {
        const data = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`);
        console.log(data);
        return res.status(200).send({trailers: data});
    } catch (error) {
        console.error('Error in movieTrailer controller:', error);
        return res.status(500).send('Error fetching movie trailers');
    }
}