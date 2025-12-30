import express from 'express';
import { movieTrailer, popularMovies, trendingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/popular', popularMovies);
router.get('/trending', trendingMovie);
router.get('/trailer/:id', movieTrailer);



export default router;