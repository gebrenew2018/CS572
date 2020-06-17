const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const cartModel = require('../models/cart.model');
const Product = mongoose.model('Product');


exports.addToCart = async(req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(' right here in add to cart');
    // var prodId = req.body.productId;
    const prodId = req.params.pId;
    console.log(prodId);
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(prodId, (err, product) => {
        if (err) {
            res.status(500).json({ message: 'Error in getting a product' });
        }

        cart.add(product, product._id);
        req.session.cart = cart;
        console.log(req.session.cart);
        var c = req.session.cart;
        // let myCart = JSON.parse(req.session.cart);
        res.status(200).json({ MyCart_Items: product });
        //res.send(JSON.stringify({ cart: req.session.cart }));

    });

}


exports.getCart = (req, res, next) => {
    console.log('get cart ');

    if (!req.session.cart) {
        console.log('error ');
        res.status(200).json({ product: req.session.cart });

    }
    const cart = new Cart(req.session.cart);
    const myCart = cart.generateArray();
    const total = cart.totalPrice;
    const tQty = cart.totalQuantity;
    const itemInCart = cart.items;
    // console.log("cart ..." + myCart);
    // console.log("total ..." + total);
    // console.log("total ..." + tQty);
    // console.log("total ..." + itemInCart._id);
    const me = 'Habtom';
    console.log(me);
    res.status(200).json({ myCart: myCart });

}


exports.deleteProductFromCart = async(req, res, next) => {
    const prodId = req.params.pId;
    console.log(prodId);
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.deleteOneProductFromCart(prodId);
    req.session.cart = cart
    updatedCart = req.session.cart;

    if (!updatedCart) {
        res.status(404).json({ message: 'Cart not found' });

    } else {
        res.status(200).json({ MyCart: updatedCart });
    }

}
exports.deleteItemFromCart = (req, res, next) => {
    const prodId = req.params.pId;
    console.log(prodId);
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(prodId)
    req.session.cart = cart
    if (!cart.items) {
        res.status(404).json({ message: 'Cart not found' });
    } else {
        updatedCart = req.session.cart;
        res.status(200).json({ MyCart: updatedCart });
    }

}