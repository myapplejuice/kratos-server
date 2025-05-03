import express from 'express'
import userRouter from './models/user/user-router.js'

//PORT NUMBER
const PORT = 8080

//INITIALIZE SERVER
const SERVER = express()
SERVER.use(express.json())

//MICROSERVICES
SERVER.use('/api/user', userRouter)

//LOGGING PORT ADDRESS
SERVER.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })

