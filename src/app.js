require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/routes');
const connectDB = require('./config/db');
const syncProducts = require('./cron/syncProducts');

const app = express();

connectDB();

app.use(express.json());

app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "API executada! ✅",
        
    });
});

syncProducts.start(); 
module.exports = app;
