import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.r99wz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})