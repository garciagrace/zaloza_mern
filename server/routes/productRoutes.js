import express from 'express';
const router = express.Router();
import {
  getProductsByCategory,
  getProductById,
  getAllProducts,
} from '../controllers/productController.js';

router.route('/:category/').get(getProductsByCategory);
router.route('/:category/:id').get(getProductById);
router.route('/').get(getAllProducts);

export default router;
