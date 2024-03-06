/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js'
import APIError from '../error/ApiError.js'
import 'express-async-errors'

dotenv.config()

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    req.user = await User.find({ userID: decoded.id })
  } catch (error) {
    console.log(error)
    throw APIError.unauthorized('Not authorized')
  }

  next()
}
