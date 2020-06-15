const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const Product = mongoose.model('Product');


exports.addToCart = async(req, res, next) => {
    console.log(' right here in add to cart');
    var productId = req.body.productId;
    console.log(productId);
    var cart = new Cart(req.body.cart ? req.body.cart : {});

    Product.findById(productId, (err, product) => {
        if (err) {
            res.status(500).json({ message: 'Error in getting a product' });
        }

        cart.add(product, productId);

        // req.body.cart = cart.generateArray();
        console.log(req.session.cart);
        res.status(200).json({ MyCart: req.body.cart });

    });

}


exports.getCart = (req, res, next) => {
    console.log('get cart ');

    if (!req.body.cart) {
        res.status(200).json({ product: null });
    }
    var cart = new Cart(req.body.cart);
    res.status(200).json({ products: cart.generateArray(), totalPrice: cart.totalPrice });


}


exports.deleteFromCart = async(req, res, next) => {

    console.log('delete cart ');
    const cart = await Cart.findById("5ee564430753ae4bfeeab22c");
    const product = await Product.findById(req.body.productId);
    if (cart) {
        const isExisting = cart.products.findIndex(productIdInDB => {
            return new String(productIdInDB.productId).trim() == new String(req.body.productId).trim()
        });
        console.log(isExisting);
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1);
            cart.totalPrice -= product.unitPrice
        }
        cart.save((err, cart) => {
            if (err) {
                res.status(400).json({ message: 'Error in deleting product from cart' + err });
            } else if (!cart) {
                res.status(404).json({ message: 'Page not found' });

            } else {
                res.status(200).json({ message: 'succesfully deleted' });
            }
        });
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }





}