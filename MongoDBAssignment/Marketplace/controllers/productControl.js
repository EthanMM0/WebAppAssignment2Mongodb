const Product = require('../models/Product');

exports.getAllProd = async (req, res) => {
    try {
        const products = await Product.find();
        console.log("Fetched products:", products);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error); 
        res.status(500).json({ message: error.message });
    }
};

exports.createProd = async (req, res) => {
    const prod = new Product(req.body);
    try {
        const savedProd = await prod.save();
        res.status(201).json(savedProd);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProd = async (req, res) => {
    try {
        const updatedProd = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProd);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProd = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findProductsWithKey = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

