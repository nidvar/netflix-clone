import express from 'express';

import { clearHistory, getSearchHistory, removeFromHistory, searchMovie, searchPerson, searchTVShow } from '../controllers/search.controller.js';

const searchRouter = express.Router();

searchRouter.get('/movies/:query', searchMovie);
searchRouter.get('/tv/:query', searchTVShow);
searchRouter.get('/person/:query', searchPerson);
searchRouter.get('/history', getSearchHistory);

searchRouter.delete('/removesearchitem/:id', removeFromHistory);
searchRouter.delete('/clearsearch', clearHistory);

export default searchRouter;