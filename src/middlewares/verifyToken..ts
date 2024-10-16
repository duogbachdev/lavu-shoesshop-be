import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: any) => {
  const headers = req.headers.authorization
  const accessToken = headers ? headers.split(' ')[1] : ''

  try {
    if (!accessToken) {
      throw new Error('No access token')
    }

    const verify: any = jwt.verify(accessToken, process.env.SECRET_KEY as string)
    console.log(verify)

    if (!verify) {
      throw new Error('Invalid access token')
    }

    req._id = verify._id
    next()
    console.log(accessToken);
  } catch (error: any) {
    res.status(401).json({
      message: error.message
    })
  }
}