import express from 'express';

import { getSearchHistory, searchMovie, searchPerson, searchTVShow } from '../controllers/search.controller.js';

const searchRouter = express.Router();

searchRouter.get('/movies/:query', searchMovie);
searchRouter.get('/tv/:query', searchTVShow);
searchRouter.get('/person/:query', searchPerson);
searchRouter.get('/history', getSearchHistory);

export default searchRouter;