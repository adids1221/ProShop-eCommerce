import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
    addOrdersItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
} from '../controllers/orderController.js'

router.route('/')
    .post(protect, addOrdersItems)

router.route('/myorders')
    .get(protect, getMyOrders)

router.route('/:id')
    .get(protect, getOrderById)

router.route('/:id/pay')
    .put(protect, updateOrderToPaid)

export default router