import express from 'express';
const router = express.Router();

import {
  getMyCart,
  addUserToCartList,
  addItemToCart,
} from '../controllers/cartControllers.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/mycart').get(protect, getMyCart);
router.route('/').post(protect, addUserToCartList).put(protect, addItemToCart);

export default router;
