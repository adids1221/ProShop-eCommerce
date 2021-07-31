import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
    addOrdersItems
} from '../controllers/orderController.js'

router.route('/')
    .post(protect, addOrdersItems)

export default router