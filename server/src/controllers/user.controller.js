import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/user.model.js'
import ApiError from '../error/ApiError.js'
import 'express-async-errors'

dotenv.config()
const { SECRET_KEY } = process.env

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password)
    throw ApiError.badRequest('Data incomplete')

  const doesExist = Boolean(await User.findOne({ email }))
  if (doesExist) throw ApiError.badRequest('Account already exists')

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = new User({
    name: `${firstName} ${lastName}`,
    email,
    password: hashedPassword,
  })

  await newUser.save()

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '7d' })
  const { _id: id, password: remove, ...userData } = newUser._doc

  res.status(200).json({ ...userData, id, token })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) throw ApiError.notFound('User not found')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw ApiError.badRequest('Wrong password')

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '7d' })
  const { _id: id, password: remove, ...userData } = user._doc

  res.status(200).json({ ...userData, id, token })
}

export const unblockUser = async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId)
  if (!user) throw ApiError.notFound('User not found')

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      isBlocked: false,
    },
    { new: true }
  )

  res
    .status(200)
    .json({ name: updatedUser.name, isBlocked: updatedUser.isBlocked })
}

export const getUsers = async (req, res) => {
  const users = await User.find()

  const usersData = users.map((user) => {
    const { _id: id, password: remove, ...userData } = user._doc
    return { ...userData, id }
  })

  res.status(200).json(usersData)
}

export const validateUser = (req, res) => {
  res.status(200).json({ isValid: req.body.role === req.user.role })
}

export const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.status(200).json({
    message: 'User fetched successfully',
    data: user,
  })
}

export const getUserByUserName = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ userID: username })
  res.status(200).json({
    message: 'User fetched successfully',
    data: user,
  })
}

export const updateUser = async (req, res, next) => {
  const { userID, threeLetterCode, role } = req.body
  let id = req.params.id
  try {
    User.findOne({ id: id }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'No User found found',
        })
      }
      if (!threeLetterCode) {
        user.threeLetterCode = user.threeLetterCode
      } else {
        user.threeLetterCode = threeLetterCode
      }
      if (!userID) {
        user.userID = user.userID
      } else {
        user.userID = userID
      }

      if (!role) {
        user.role = user.role
      } else {
        user.role = role
      }

      user.save((err, updatedUser) => {
        if (err) {
          return res.status(400).json({
            error: 'User not updated',
          })
        }
        res.json(updatedUser)
      })
    })
  } catch (err) {
    console.error('Update Controller not working')
    next(err)
  }
}
export const deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    res.status(404).json({
      message: 'User not found',
    })
  } else {
    await user.remove()
    res.status(200).json({
      message: 'User deleted successfully',
    })
  }
}

// create a delete user function that will delete a user from the database by their id and delete all their swaps where their id in the userID field of the swap
// also delete all chats where their id is in the _id field of the chat members array
export const deleteAllUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    res.status(404).json({
      message: 'User not found',
    })
  } else {
    await user.remove()
    res.status(200).json({
      message: 'User deleted successfully',
    })

    await Swap.deleteMany({ userID: id }, (err, swap) => {
      if (err) {
        return res.status(400).json({
          error: 'Swaps not deleted',
        })
      }
      res.json(swap)
    })

    // chat delete where id = _id in chat members array
    await Chat.deleteMany({ 'members._id': id }, (err, chat) => {
      if (err) {
        return res.status(400).json({
          error: 'Chats not deleted',
        })
      }
      res.json(chat)
    })
  }

  return res.status(200).json({
    message: 'User deleted successfully',
  })
}