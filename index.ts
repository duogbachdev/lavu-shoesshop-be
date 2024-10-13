import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRouter from './src/routers/user'
import cors from 'cors'
dotenv.config()

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.r99wz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL)
    console.log(`Connect to database successfully`);
  } catch (error) {
    console.log(`Can not connect to database ${error}`);
  }
}

connectDB().then(() => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error);
  }
})