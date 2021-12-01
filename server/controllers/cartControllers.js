import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';

// @desc    Fetch logged in user cart item
// @route   GET /api/cart/mycart
// @access  Private
const getMyCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    res.json(cart.cartItems);
  } else {
    res.json([]);
  }
});

// @desc    Add user to cart list
// @route   POST /api/carts/user
// @access  Private
const addUserToCartList = asyncHandler(async (req, res) => {
  const { user } = req.body;

  const checkUser = await Cart.findOne({ user });

  if (!checkUser) {
    const newUser = new Cart({
      user,
      cartItems: [],
    });

    const addUser = await newUser.save();

    res.status(201).json(addUser);
  }
});

// @desc    Add item to cart
// @route   PUT /api/carts/
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const { user, name, qty, image, price, category, product } = req.body;

  // Fetch cart of logged in user
  const userCart = await Cart.findOne({ user });

  // check if item already exist on the cart
  const existItem = userCart.cartItems.find((x) => x.product === product);

  if (existItem) {
    let cartFiltered = userCart.cartItems.filter((x) => {
      return x.name !== existItem.name;
    });

    existItem.qty += qty;

    if (!cartFiltered) {
      userCart.cartItems = { existItem };
    }
  } else {
    userCart.cartItems = [
      ...userCart.cartItems,
      {
        name,
        qty,
        image,
        price,
        category,
        product,
      },
    ];
  }

  const updatedCart = await userCart.save();

  res.status(201).json(updatedCart);
});

export { getMyCart, addUserToCartList, addItemToCart };
