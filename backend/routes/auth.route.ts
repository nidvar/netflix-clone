import express from 'express';
import { login, signUp,logout, refreshTokenEndpoint } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/logout', protectRoute, logout);
router.post('/refreshtoken', refreshTokenEndpoint);

export default router;