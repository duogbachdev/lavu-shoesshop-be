import UserModel from "../models/UserModel"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

const register = async (req: any, res: any) => {
  const body = req.body
  const { email, name, password } = body

  try {
    const user = await UserModel.findOne({ email })

    if (user) {
      throw new Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    body.password = hashPassword

    const newUser = await UserModel.create(body)
    await newUser.save()

    res.status(200).json({
      message: 'Register successfully',
      data: newUser
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}


export { register } 