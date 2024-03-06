import express from 'express'
import {
  getUsers,
  validateUser,
  getUserById,
  getUserByUserName,
  createToken,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/validateUser', auth, validateUser)
router.get('/', auth, getUsers)
router.get('/id/:id', auth, getUserById)
router.get('/username/:username', getUserByUserName)
router.post('/token', createToken)
router.put('/update/:id', auth, updateUser)
router.delete('/delete/:id', auth, deleteUser)

export default router
