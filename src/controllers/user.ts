import UserModel from "../models/UserModel"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { getAccessToken } from "../utils/getAccessToken"
import { generatorRandomText } from "../utils/generatorRadomText"
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

    const newUser: any = new UserModel(body)
    await newUser.save()

    delete newUser._doc.password

    // newUser.token = await getAccessToken({
    //   _id: newUser._id,
    //   email: newUser.email,
    //   role: 0
    // })

    res.status(200).json({
      message: 'Register successfully',
      data: {
        ...newUser._doc,
        token: await getAccessToken({
          _id: newUser._id,
          email: newUser.email,
          role: 0
        })
      }
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}

const login = async (req: any, res: any) => {
  const body = req.body
  const { email, password } = body

  try {
    const user: any = await UserModel.findOne({ email })

    if (!user) {
      throw new Error('Account does not exist')
    }

    const isMatchPassword = await bcrypt.compare(body.password, user.password)

    if (!isMatchPassword) {
      throw new Error('Login failed please check information again')
    }

    delete user._doc.password

    res.status(200).json({
      message: 'Login successfully',
      data: {
        ...user._doc,
        token: await getAccessToken({
          _id: user._id,
          email: user.email,
          role: user.role ?? 0
        })
      }
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}

const loginWithGoogle = async (req: any, res: any) => {
  const body = req.body
  const { email, name } = body

  try {
    const user: any = await UserModel.findOne({ email })

    if (user) {

      delete user._doc.password

      res.status(200).json({
        message: 'Login successfully',
        data: {
          ...user._doc,
          token: await getAccessToken({
            _id: user._id,
            email: user.email,
            role: user.role ?? 0
          })
        }
      })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(generatorRandomText(6), salt)

      body.password = hashPassword

      const newUser: any = new UserModel(body)
      await newUser.save()

      delete newUser._doc.password

      // newUser.token = await getAccessToken({
      //   _id: newUser._id,
      //   email: newUser.email,
      //   role: 0
      // })

      res.status(200).json({
        message: 'Register successfully',
        data: {
          ...newUser._doc,
          token: await getAccessToken({
            _id: newUser._id,
            email: newUser.email,
            role: 0
          })
        }
      })
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}

const refreshToken = async (req: any, res: any) => {
  const { id } = req.query

  console.log(id);
  try {
    const user = await UserModel.findById(id)

    if (!user) {
      throw new Error('User does not exist')
    }

    const token = await getAccessToken({
      _id: user._id,
      email: user.email,
      role: user.role ?? 0
    })
    res.status(200).json({
      message: 'Refresh token successfully',
      data: token
    })
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}


export { register, login, loginWithGoogle, refreshToken } 