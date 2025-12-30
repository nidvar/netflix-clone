import express from 'express';
import { popularMovies } from '../controllers/movie.controller.js';

const router = express.Router();


router.get('/popular', popularMovies);



export default router;