import express from 'express'
import { auth } from '../middleware/auth.js'
import {
  getChats,
  getChat,
  createPrivateChat,
  createMessage,
  deleteChat,
  addMember,
} from '../controllers/chat.controller.js'
import idValidator from '../middleware/idValidator.js'

const router = express.Router()

router.use(auth)

router.get('/', getChats)
router.get('/:chatId', idValidator, getChat)

router.post('/private', createPrivateChat)

router.post('/:chatId', idValidator, createMessage)

router.put('/:chatId/add-member', idValidator, addMember)

router.delete('/:chatId', idValidator, deleteChat)

export default router
