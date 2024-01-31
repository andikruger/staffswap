import mongoose from 'mongoose'
import Chat from '../models/chat.model.js'
import User from '../models/user.model.js'
import ApiError from '../error/ApiError.js'
import 'express-async-errors'

export const getChats = async (req, res) => {
  const { user } = req
  const chats = await Chat.find({ 'members._id': user._id })
  res.status(200).json(chats)
}

export const getChat = async (req, res) => {
  const { user } = req
  const { chatId } = req.params

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const userId = mongoose.Types.ObjectId(user._id).toString()
  const isMember = chat.members.find((member) => member._id === userId)
  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  res.status(200).json(chat)
}

export const createPrivateChat = async (req, res) => {
  const creator = req.user
  const { email } = req.body

  if (email === creator.email)
    throw ApiError.methodNotAllowed(
      'Cannot create a chat with your own account'
    )

  const user = await User.findOne({ email })
  if (!user) throw ApiError.notFound('User not found')
  if (user.role !== 'user')
    throw ApiError.methodNotAllowed('Creating such chat is not allowed')

  const doesChatExist = await Chat.findOne({
    type: 'private',
    'members._id': { $all: [creator._id, user._id] },
  })
  if (doesChatExist) throw ApiError.methodNotAllowed('Chat already exists')

  const newChat = new Chat({
    members: [
      {
        _id: creator._id,
        name: creator.name,
      },
      {
        _id: user._id,
        name: user.name,
      },
    ],
  })

  await newChat.save()

  res.status(200).json(newChat)
}

export const addMember = async (req, res) => {
  const { chatId } = req.params
  const { email } = req.body

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const newMember = await User.findOne({ email })
  if (!newMember) throw ApiError.notFound('User not found')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(newMember._id).toString()
  )
  if (isMember) throw ApiError.methodNotAllowed('User is already a member')

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { members: { _id: newMember._id, name: newMember.name } },
    },
    { new: true }
  )

  res.status(200).json(updatedChat.members)
}

export const deleteChat = async (req, res) => {
  const { user } = req
  const { chatId } = req.params

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
  )
  if (!isMember)
    throw ApiError.forbidden('Only chat member can perform this operation')

  await chat.remove()

  res.status(200).json({ message: 'Chat deleted successfully' })
}

export const createMessage = async (req, res) => {
  const { user } = req
  const { chatId } = req.params
  const { text } = req.body

  if (!text) throw ApiError.badRequest('Message must have text')

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
  )
  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  const message = {
    sender: {
      _id: user._id,
      name: user.name,
    },
    text,
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { messages: message },
      recentMessage: message,
    },
    { new: true }
  )

  res.status(200).json(updatedChat.recentMessage)
}
