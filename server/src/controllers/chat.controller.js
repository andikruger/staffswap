import mongoose from 'mongoose'
import Chat from '../models/chat.model.js'
import User from '../models/user.model.js'
import ApiError from '../error/ApiError.js'
import 'express-async-errors'

export const getChatsByUserId = async (req, res) => {
  const { userId } = req.params
  const chats = await Chat.find({ 'members._id': userId })
  res.status(200).json(chats)
}

export const getChat = async (req, res) => {
  const { userId, chatId } = req.params

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const user = mongoose.Types.ObjectId(userId).toString()
  const isMember = chat.members.find((member) => member._id === user)
  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  res.status(200).json(chat)
}

export const getChatById = async (req, res) => {
  const { chatId } = req.params

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  res.status(200).json(chat)
}

export const createPrivateChat = async (req, res) => {
  const { creatorId, partnerId, swapDetails } = req.body

  let welcomeMessage = ''

  const user = await User.findById(partnerId)

  const creator = await User.findById(creatorId)
  if (!user) {
    console.log('User not found')
    throw ApiError.notFound('User not found')
  }

  const doesChatExist = await Chat.findOne({
    type: 'private',
    'members._id': { $all: [creatorId, partnerId] },
  })
  //console.log('Does chat exist:', doesChatExist)
  if (doesChatExist) {
    if (swapDetails) {
      let formattedDate = new Date(swapDetails.date).toLocaleDateString(
        'en-GB',
        {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }
      )
      welcomeMessage = `Hello, I am interested in your Swap: on ${formattedDate} at ${swapDetails.startTime} - ${swapDetails.endTime}.`

      const message = {
        sender: {
          _id: 1,
          name: 'SwapBot',
        },
        text: welcomeMessage,
      }

      const updatedChat = await Chat.findByIdAndUpdate(
        doesChatExist._id,
        {
          $push: { messages: message },
          recentMessage: message,
        },
        { new: true }
      )
      throw ApiError.methodNotAllowed('Chat already exists')
    }

    throw ApiError.methodNotAllowed('Chat already exists')
  }

  const newChat = new Chat({
    members: [
      {
        _id: creatorId,
        name: creator.name,
      },
      {
        _id: partnerId,
        name: user.name,
      },
    ],
  })

  await newChat.save()

  if (swapDetails) {
    let formattedDate = new Date(swapDetails.date).toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    welcomeMessage = `Hello, I am interested in your Swap: on ${formattedDate} at ${swapDetails.startTime} - ${swapDetails.endTime}.`

    const message = {
      sender: {
        _id: 1,
        name: 'SwapBot',
      },
      text: welcomeMessage,
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      newChat._id,
      {
        $push: { messages: message },
        recentMessage: message,
      },
      { new: true }
    )

    return res.status(200).json(updatedChat)
  }

  return res.status(200).json(newChat)
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
  const { userId, chatId } = req.params

  const chat = await Chat.findById(chatId)

  if (!chat) throw ApiError.notFound('Chat not found')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(userId).toString()
  )

  if (!isMember)
    throw ApiError.forbidden('Only chat member can perform this operation')

  await chat.remove()

  res.status(200).json({ message: 'Chat deleted successfully' })
}

export const createMessage = async (req, res) => {
  const { userId, chatId } = req.params
  const { text } = req.body

  if (!text) throw ApiError.badRequest('Message must have text')

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(userId).toString()
  )
  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  const message = {
    sender: {
      _id: userId,
      name: isMember.name,
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
