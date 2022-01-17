import express from 'express';
const router = express.Router();

import {
  getMyCart,
  addUserToCartList,
  addItemToCart,
  removeItemOnCart,
  clearCart,
} from '../controllers/cartControllers.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/mycart').get(protect, getMyCart).put(protect, removeItemOnCart);
router.route('/').post(protect, addUserToCartList).put(protect, addItemToCart);
router.route('/clearcart').put(protect, clearCart);

export default router;
