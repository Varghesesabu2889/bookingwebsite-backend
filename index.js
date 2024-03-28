import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoutes from './router/tourRoutes.js'
import userRoutes from './router/userRouter.js'
import authRoute from './router/authRoute.js'
import bookingRoute from './router/bookRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 6000
const corsOptions ={
  origin:true,
  credentials:true,

}
// Database connection
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB database connected");
    } catch (err) {
      console.error(err);
      console.log("MongoDB database connection failed");
    }
  };



  //testing
  app.get("/", (req, res) => {
    res.send(`Backend is running on ${port}`);
  });

//middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/tours',tourRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/booking',bookingRoute)

 app.listen(port,()=>{
    connect()
    console.log(`Server is listening port at ${port}`);
 })