import express from 'express';

import { searchMovie } from '../controllers/search.controller.js';

const searchRouter = express.Router();

searchRouter.get('/movies/:query', searchMovie);

export default searchRouter;