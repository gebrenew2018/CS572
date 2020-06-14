const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const Product = mongoose.model('Product');


exports.addToCart = async(req, res, next) => {
    console.log(req.body.products[0].productId);
    const product = await Product.findById(req.body.products[0].productId);
    console.log(product);

    const cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        products: [{
            productId: req.body.products[0].productId,
            // price: req.body.products[0].price,
            quantity: 1
        }],
        totalPrice: product.totalPrice
    });
    console.log(cart);
    const currentCart = Cart.findById("5ee5622849b0a34aa09b5b71");
    if (currentCart) {
        console.log('cart already exist');
        if (product) {

            const isExisting = cart.products.findIndex(productIdInDB => {
                return new String(productIdInDB.productId).trim() == new String(req.body.products[0].productId).trim()
            });
            if (isExisting >= 0) {
                console.log(' greater than 0');
                cart.products[isExisting].quantity += 1;
                cart.totalPrice += product.unitPrice;
            } else {
                console.log(' lessthan than 0');
                cart.products.push({ productId: product._id, quantity: 1 });
            }
            if (!cart.totalPrice) {
                cart.totalPrice = 0;
            }

            cart.totalPrice += product.unitPrice;


            //......
            // return this.save()
            cart.save((err, cart) => {
                if (err) {
                    res.status(500).json({ message: 'Error in adding to cart: ' + err });
                } else if (!cart) {
                    res.status(404).json({ message: 'Cart No Found' });
                } else {
                    res.status(200).json({ cart: cart });
                }
            })



        }
    } else {
        console.log("new cart")
        cart.save((err, cart) => {
            if (err) {
                res.status(500).json({ message: 'Error in adding to cart: ' + err });
            } else if (!cart) {
                res.status(404).json({ message: 'Cart No Found' });
            } else {
                res.status(200).json({ cart: cart });
            }
        })
    }


}


exports.getCart = (req, res, next) => {
    Cart.find((err, cart) => {
        if (err) {
            res.status(500).json({ message: 'Error in get Cart ' });
        } else if (!cart) {
            res.status(404).json({ message: 'No Products Found' });

        } else {
            res.status(200).json({ cart: cart });
        }

    });
    console.log('get cart ');

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