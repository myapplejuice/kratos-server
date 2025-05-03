import { Router } from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './user-controller.js'

const userRouter = Router()

userRouter
    .get('/all', getUsers)
    .get('/single/:id', getUserById)
    .post('/create', createUser)
    .put('/update/:id', updateUser)
    .delete('/delete/:id', deleteUser) 

export default userRouter