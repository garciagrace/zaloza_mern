import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route('/myorder').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/pay/:id').put(updateOrderToPaid);
router.route('/deliver/:id').put(updateOrderToDelivered);

export default router;
