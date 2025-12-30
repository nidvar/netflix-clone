import express from 'express';
import { movieDetails, movieTrailer, moviesByCategory, similarMovies, trendingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/:category', moviesByCategory);
router.get('/trending', trendingMovie);
router.get('/trailer/:id', movieTrailer);
router.get('/details/:id', movieDetails);
router.get('/similar/:id', similarMovies);

export default router;