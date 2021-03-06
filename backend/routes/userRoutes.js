import express from 'express'
const router = express.Router()
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(protect, isAdmin, getUsers)
    .post(registerUser)

router.route('/login')
    .post(authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .delete(protect, isAdmin, deleteUser)
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)

export default router