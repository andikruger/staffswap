// create the routes for a crud api

import express from 'express'
const router = express.Router()

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
router.get('/', getAllController)
router.get('/:id', getByIDController)
router.get('/user/:id', getByUserController)
router.get('/role/:role', getByRoleController)
router.get('/get/count', getCountController)
router.get('user/count/:id', getCountUserController)
router.get('/month/user/:id', getNextMonthController)
router.get('/search/:search', getSearchController)
router.put('/:id', updateController)
router.put('/status/:id', updateStatusController)
router.delete('/:id', deleteController)
router.delete('/old', deleteOldSwapsController)

export default router
