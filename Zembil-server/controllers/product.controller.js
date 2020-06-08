const mongoose = require('mongoose');
const Product = require('../models/product.model');
// const Product = mongoose.model('Product');


module.exports.addNewProduct = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        
        productName: req.body.productName,
        quantity: req.body.quantity,
        supplierId: req.body.supplierId,
        unitPrice: req.body.unitPrice,
    });

    console.log(product);
    res.status(200).json({ product: product });
}