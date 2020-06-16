const mongoose = require('mongoose');


const Cart = require('../models/cart.model');
const Product = mongoose.model('Product');
const User = mongoose.model('Product');
const Order = require('../models/order.model');


exports.addToCart = (req, res, next) => {
    console.log(' right here in add to cart');
    // var prodId = req.body.productId;
    const prodId = req.params.id;
    console.log(prodId);
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(prodId, (err, product) => {
        if (err) {
            res.status(500).json({ message: 'Error in getting a product' });
        }

        cart.add(product, product._id);
        req.session.cart = cart;
        // req.body.cart = cart.generateArray();
        console.log(req.session.cart);
        res.status(200).json({ MyCart: req.session.cart });

    });

}


exports.getCart = (req, res, next) => {
    console.log('get cart ');

    if (!req.session.cart) {
        res.status(200).json({ product: req.session.cart });
    }
    var cart = new Cart(req.session.cart);
    res.status(200).json({ My_Cart: cart });


}


exports.deleteFromCart = async(req, res, next) => {
    console.log('delete cart ');
    cart = req.session.cart;
    const product = await Product.findById(req.body.productId);
    if (cart) {
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
exports.checkout = (req, res, next) => {
    let cart = req.session.cart;
    res.status(200).json({ totalPrice: cart.totalPrice });
}
exports.postCheckout = (req, res, next) => {
    // let cart = req.session.cart;
    const user = User.findById(req.body.userId);
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: {
            userId: req.body.userId
        },
        cart: req.session.cart,
        address: req.body.address
    });
    console.log(order);
    // res.status(200).json({ Order: order });
    order.save((err, result) => {
        if (err) {
            res.status(400).json({ message: 'Error in Saving the Order' + err });
        } else if (!result) {
            res.status(404).json({ message: 'Page not found' });

        } else {
            res.locals.session = null;
            res.status(200).json({ Order: result });

        }
    });


    res.status(200).json({ totalPrice: cart.totalPrice });
}