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
router.get('/:chatId', auth, idValidator, getChatById)

router.get('/chat/:userId', auth, getChatsByUserId)

router.get('/chat/:userId/:chatId', auth, idValidator, getChat)

router.post('/private', auth, createPrivateChat)

// router.post('/:chatId', idValidator, createMessage)

router.post('/chat/:userId/:chatId', auth, idValidator, createMessage)

router.put('/:chatId/add-member', auth, idValidator, addMember)

router.delete('/:userId/:chatId', auth, idValidator, deleteChat)

export default router
