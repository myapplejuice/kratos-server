import { Router } from 'express'
import UserController from './user-controller.js';
import { asyncHandler } from '../../utils/async-handler.js';
import { authorization } from '../../middleware/authorization.js';

const USER_ROUTER = Router()

USER_ROUTER
    .get('/all', authorization ,asyncHandler(UserController.getUsers))
    .get('/single/:id', authorization, asyncHandler(UserController.getUserById))
    .post('/create', asyncHandler(UserController.createUser))
    .post('/login', asyncHandler(UserController.loginUser))
    .put('/update/:id', asyncHandler(UserController.updateUser))
    .delete('/delete/:id', authorization, asyncHandler(UserController.deleteUser))

export default USER_ROUTER