import express from 'express';

import { movieDetails, movieTrailer, moviesByCategory, similarMovies, trendingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/:type/trending', trendingMovie);
router.get('/:type/trailer/:id', movieTrailer);
router.get('/:type/details/:id', movieDetails);
router.get('/:type/similar/:id', similarMovies);
router.get('/:type/categories/:category', moviesByCategory);

export default router;