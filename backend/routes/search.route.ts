import express from 'express';

import type { Request, Response } from 'express';

const searchRouter = express.Router();

searchRouter.post('/', (req: Request, res: Response)=>{
    res.send('search routes');
});

export default searchRouter;