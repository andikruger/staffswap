/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js'

dotenv.config()
const { SECRET_KEY } = process.env

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = await User.findById(decoded.id)
  } catch (error) {
    return res.status(401).json({ message: 'Account not found' })
  }

  next()
}
