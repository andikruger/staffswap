import express from 'express'
import {
  signUp,
  signIn,
  getUsers,
  validateUser,
  getUserById,
  getUserByUserName,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/validateUser', auth, validateUser)
router.get('/', getUsers)
router.get('/id/:id', getUserById)
router.get('/username/:username', getUserByUserName)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router
