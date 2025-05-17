import {Router} from 'express';
import userRouter from '../models/user/user-router.js';
import uploadRouter from '../models/upload/upload-router.js';

const V1_ROUTER = new Router();
//MICROSERVICE
V1_ROUTER.use('/user', userRouter);
V1_ROUTER.use('/upload', uploadRouter);

export default V1_ROUTER;