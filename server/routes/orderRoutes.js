import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route('/myorder').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
