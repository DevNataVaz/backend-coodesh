const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().limit(100).exec(); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products' });
    }
};

exports.getProductByCode = async (req, res) => {
    try {
        const product = await Product.findOne({ code: req.params.code });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product' });
    }
};

exports.updateProductByCode = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { code: req.params.code },
            req.body,
            { new: true, runValidators: true }
        );
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};

exports.deleteProductByCode = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { code: req.params.code },
            { status: 'trash' },
            { new: true }
        );
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};
