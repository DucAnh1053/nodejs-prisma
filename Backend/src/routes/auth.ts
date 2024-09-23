import {Router} from 'express';
import { signup, login, me } from '../controllers/auth';
import { errorHandler } from '../error_handler';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const authRoutes:Router = Router();

authRoutes.post('/signup', [authMiddleware,adminMiddleware], errorHandler(signup));
authRoutes.post('/login', errorHandler(login));
authRoutes.get('/me', [authMiddleware], errorHandler(me));

export default authRoutes;