import express from 'express'
import { auth } from '../middleware/auth.js'
import {
  //getChats,
  getChatsByUserId,
  getChat,
  getChatById,
  createPrivateChat,
  createMessage,
  deleteChat,
  addMember,
} from '../controllers/chat.controller.js'
import idValidator from '../middleware/idValidator.js'

const router = express.Router()

//router.get('/', getChats)
router.get('/:chatId', idValidator, getChatById)

router.get('/chat/:userId', getChatsByUserId)

router.get('/chat/:userId/:chatId', idValidator, getChat)

router.post('/private', createPrivateChat)

// router.post('/:chatId', idValidator, createMessage)

router.post('/chat/:userId/:chatId', idValidator, createMessage)

router.put('/:chatId/add-member', idValidator, addMember)

router.delete('/:userId/:chatId', idValidator, deleteChat)

export default router
