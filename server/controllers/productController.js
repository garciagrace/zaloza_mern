import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products by category
// @route   GET /api/products/:category/
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;

  // Fetch all products and filtered by specific category
  const products = (await Product.find({})).filter(
    (p) => p.category.toLowerCase() === category
  );

  res.json({ products });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProductsByCategory, getProductById };
