import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ObjectId, Types } from 'mongoose'
dotenv.config()

export const getAccessToken = async (payload: {
  _id: Types.ObjectId, email: string, role: number
}) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY as string)
  // const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
  //   expiresIn: 60,
  // })
  return token
}