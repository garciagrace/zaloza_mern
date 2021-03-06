import express from 'express';
const router = express.Router();
import {
  getProductsByCategory,
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/:category/').get(getProductsByCategory);
router.route('/:category/:id').get(getProductById);
router.route('/').get(getAllProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
