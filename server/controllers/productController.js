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

// @desc    Fetch all products
// @route   GET /api/products/
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword });

  res.json(products);
});

// @desc    Create new products
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    category,
    productType,
    price,
    stocks,
    image,
  } = req.body;

  const productExists = await Product.findOne({ name, brand });

  if (productExists) {
    res.status(400);
    throw new Error('Product already exists');
  }

  const product = await Product.create({
    name,
    brand,
    description,
    category,
    productType,
    price,
    stocks,
    image,
  });

  if (product) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      category: product.category,
      productType: product.productType,
      price: product.price,
      stocks: product.stocks,
      image: product.image,
    });
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    category,
    productType,
    price,
    stocks,
    image,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.brand = brand;
    product.description = description;
    product.category = category;
    product.productType = productType;
    product.price = price;
    product.stocks = stocks;
    product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProductsByCategory,
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
