import express from 'express'
import V1_ROUTER from './routes/v1.js'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middleware/error-handler.js'


//PORT NUMBER
const PORT = 8080

//INITIALIZE SERVER
const SERVER = express()

//ADD JSON & FORMDATA SUPPORT
SERVER.use(express.json())
SERVER.use(express.urlencoded({ extended: true }))

//MIDDLEWARE
SERVER.use(cors())
SERVER.use(morgan("dev"))

//MICROSERVICE
SERVER.use('/api/v1', V1_ROUTER)

//ERROR HANDLER
SERVER.use((req, res, next) => {
  req.setTimeout(0); // Disable request timeout
  next();
});
SERVER.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
SERVER.use(errorHandler)

//LOGGING PORT ADDRESS
SERVER.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })


