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
router.get('/', getUsers)
router.get('/id/:id', getUserById)
router.get('/username/:username', getUserByUserName)
router.post('/token', createToken)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router
