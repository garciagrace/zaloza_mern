import express from 'express';
const router = express.Router();

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id').get(protect, admin, getUserById);

export default router;
