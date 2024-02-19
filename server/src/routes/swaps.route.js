// create the routes for a crud api

import express from 'express'
const router = express.Router()

import {
  createController,
  getAllController,
  getByIDController,
  getByUserController,
  getCountController,
  getCountUserController,
  getNextMonthController,
  getSearchController,
  updateController,
  updateStatusController,
  deleteController,
} from '../controllers/swap.controller.js'

router.post('/new', createController)
router.get('/', getAllController)
router.get('/:id', getByIDController)
router.get('/user/:id', getByUserController)
router.get('/get/count', getCountController)
router.get('user/count/:id', getCountUserController)
router.get('/month/user/:id', getNextMonthController)
router.get('/search/:search', getSearchController)
router.put('/:id', updateController)
router.put('/status/:id', updateStatusController)
router.delete('/:id', deleteController)

export default router
