import express from 'express'
import userRouter from './models/user/user-router.js'

//PORT NUMBER
const PORT = 5500

//INITIALIZE SERVER
const SERVER = express()
SERVER.use(express.json())

//#region MICROSERVICES
//USER SERVICE
SERVER.use('/api/user', userRouter)
//#endregion

//LOGGIN PORT ADDRESS
SERVER.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })

