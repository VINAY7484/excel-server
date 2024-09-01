import express from 'express';
import { user } from '../controllers/userController.js';

const allRoute = express.Router();

allRouter.post('/v1', registerUser);

export default allRouter;
