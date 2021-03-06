const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const Product = mongoose.model('Product');
const Shoppingcart = mongoose.model('Shoppingcart')

// exports.addToCart = async(req, res, next) => {
//     console.log(' right here in add to cart');
//     var productId = req.body.productId;
//     console.log(productId);
//     var cart = new Cart(req.body.cart ? req.body.cart : {});

//     Product.findById(productId, (err, product) => {
//         if (err) {
//             res.status(500).json({ message: 'Error in getting a product' });
//         }

//         cart.add(product, productId);

//         // req.body.cart = cart.generateArray();
//         console.log(req.session.cart);
//         res.status(200).json({ MyCart: req.body.cart });

//     });

// }
exports.addToCart = async(req, res, next) => {
    // console.log('inside cart controller')
    // console.log(req.params.userid)
    const user = req.params.userid;
    const prodid = req.body._id;
    var unitPrice = parseInt(req.body.unitPrice);
    var qty = 1;
    var subtotal = unitPrice * qty;

    const cart = new Shoppingcart({
        _id: new mongoose.Types.ObjectId(),
        user: req.params.userid,
        items: [{
            _id: req.body._id,
            productName: req.body.productName,
            imageUrl: req.body.imageUrl,
            quantity: qty,
            unitPrice: unitPrice,
            subtotal: unitPrice
        }],
        totalPrice: unitPrice
    })
    newProduct = {
        _id: req.body._id,
        productName: req.body.productName,
        imageUrl: req.body.imageUrl,
        quantity: 1,
        unitPrice: unitPrice,
        subtotal: 123
    };
    const custCart = await Shoppingcart.find({ user: user });
    console.log("custCart");
    console.log(custCart);
    if (custCart.length > 0) {
        const existingcartid = custCart[0]._id;
        let itemIndex = custCart[0].items.findIndex(p => p._id == prodid);
        if (itemIndex > -1) {
            // update existing quantity
            let productItem = custCart[0].items[itemIndex];
            productItem.quantity = productItem.quantity + 1;
            custCart[0].totalPrice += unitPrice;
            //  console.log(custCart[0].totalPrice)
            custCart[0].items[itemIndex] = productItem;
        } else {
            custCart[0].totalPrice += unitPrice;
            console.log(cart.totalPrice)
                // add item to existing cart
            Shoppingcart.findOneAndUpdate({
                _id: existingcartid
            }, { $addToSet: { "items": newProduct } }, (err, updated) => {
                console.log(updated);
            });
        }
        await custCart[0].save();
        res.send({ message: 'Item succcssfully added to cart' })
    } else {
        // create ne cart for the user
        cart.save((err, cart) => {
            if (!err) {
                res.send({ message: 'Item succcssfully added to cart' })
            } else {
                res.status(500).json({ message: 'Error occured in inserting item to cart' })

            }
        })
    }
}

exports.getCart = (req, res, next) => {
    Shoppingcart.find({ user: req.params.userid }, (err, cart) => {
            if (!err) {
<<<<<<< HEAD
                if(cart.length>0){
                    res.status(200).json({ cart: cart[0].items });
                }
                else{
                    res.status(500).json({ cart: null })
                }
=======
                if (cart.length > 0)
                    res.status(200).json({ cart: cart[0].items, total: cart[0].totalPrice });
                else
                    res.send({ message: 'No Items in the cart' })
>>>>>>> e0cd1e14ca7da70919cd51461936f5c69e85d4a6
            } else {
                res.send({ message: 'No Items in the cart' })
            }
        })
        // res.status(200).json({ products: cart.generateArray(), totalPrice: cart.totalPrice });


}


module.exports.deleteFromCart = async(req, res, next) => {

    console.log('delete cart ');

    const user = req.params.userid;
    const prodid = req.params.prodid;
    const product = await Product.findById(prodid);
    var unitPrice = parseInt(product.unitPrice);
    console.log(user);
    console.log(product);

    const custCart = await Shoppingcart.find({ user: user });
    if (custCart.length > 0) {
        const existingcartid = custCart[0]._id;
        let itemIndex = custCart[0].items.findIndex(p => p._id == product._id);
        console.log(itemIndex);

        if (itemIndex > -1) {
            custCart[0].items.splice(existingcartid, 1);
            custCart[0].totalPrice = custCart[0].totalPrice - unitPrice;
            custCart[0].save((err, updatedCart) => {
                if (updatedCart) {
                    res.send({ message: 'Item succcssfully deleted to cart' })
                } else {
                    res.status(500).json({ message: 'Error occured in deleting from cart' })
                }
            });
        }
    } else {
        res.status(500).json({ message: 'Error occured in deleting from cart' })
    }
    // const cart = await Cart.findById("5ee564430753ae4bfeeab22c");
    // const product = await Product.findById(req.body.productId);
    // if (cart) {
    //     const isExisting = cart.products.findIndex(productIdInDB => {
    //         return new String(productIdInDB.productId).trim() == new String(req.body.productId).trim()
    //     });
    //     console.log(isExisting);
    //     if (isExisting >= 0) {
    //         cart.products.splice(isExisting, 1);
    //         cart.totalPrice -= product.unitPrice
    //     }
    //     cart.save((err, cart) => {
    //         if (err) {
    //             res.status(400).json({ message: 'Error in deleting product from cart' + err });
    //         } else if (!cart) {
    //             res.status(404).json({ message: 'Page not found' });

    //         } else {
    //             res.status(200).json({ message: 'succesfully deleted' });
    //         }
    //     });
    // } else {
    //     res.status(404).json({ message: 'Cart not found' });
    // }


}