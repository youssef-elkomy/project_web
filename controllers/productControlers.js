const { Product } = require('../models/product');
const bcrypt = require('bcryptjs');
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product.' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product.', error: err.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found.' });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product.', error: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found.' });

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product.' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
