const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const productControl = require('./controllers/productControl');
const app = express();

app.use(cors());
app.use(express.json());

// Connection
const uri = 'mongodb+srv://dbUser01:Passw0rd001@assignment2.i0un5.mongodb.net/Marketplace?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Welcome to my Marketplace application');
});

// Routes
app.get('/marketplace/product', productControl.getAllProd);  // Get all
app.post('/marketplace/product', productControl.createProd);  // Create
app.put('/marketplace/product/:id', productControl.updateProd); // Update
app.delete('/marketplace/product/:id', productControl.deleteProd); // Delete 
app.get('/marketplace/product/:id', productControl.getProductById); // Get productBy id
app.delete('/marketplace/product', productControl.deleteAllProducts); // Delete all
app.get('/marketplace/product/search/:keyword', productControl.findProductsWithKey); // product with keywords




module.exports = app;
