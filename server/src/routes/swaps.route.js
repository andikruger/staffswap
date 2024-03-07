// create the routes for a crud api

import express from 'express'
const router = express.Router()
import { auth } from '../middleware/auth.js'
import {
  createController,
  getAllController,
  getByIDController,
  getByUserController,
  getByRoleController,
  getCountController,
  getCountUserController,
  getNextMonthController,
  getSearchController,
  updateController,
  updateStatusController,
  deleteController,
  deleteOldSwapsController,
} from '../controllers/swap.controller.js'

router.post('/new', createController)
router.get('/', auth, getAllController)
router.get('/:id', auth, getByIDController)
router.get('/user/:id', auth, getByUserController)
router.get('/role/:role', auth, getByRoleController)
router.get('/get/count', auth, getCountController)
router.get('user/count/:id', auth, getCountUserController)
router.get('/month/user/:id', auth, getNextMonthController)
router.get('/search/:search', auth, getSearchController)
router.put('/:id', auth, updateController)
router.put('/status/:id', auth, updateStatusController)
router.delete('/:id', auth, deleteController)
router.delete('/old', auth, deleteOldSwapsController)
router.get('/test/test', (req, res) => {
  res.send('Swap route works on deploy!')
})

export default router
