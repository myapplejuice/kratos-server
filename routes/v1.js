import {Router} from 'express';
import USER_ROUTER from '../models/user/user-router.js';
import UPLOAD_ROUTER from '../models/upload/upload-router.js';

const V1_ROUTER = new Router();
//MICROSERVICE
V1_ROUTER.use('/user', USER_ROUTER);
V1_ROUTER.use('/upload', UPLOAD_ROUTER);

export default V1_ROUTER;