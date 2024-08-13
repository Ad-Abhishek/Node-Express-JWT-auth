import express from 'express';
import userController from '../controller/userController.js';
import jwtVerify from '../middleware/jwtVerify.js';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/profile', jwtVerify, userController.getData);

export default userRouter;
