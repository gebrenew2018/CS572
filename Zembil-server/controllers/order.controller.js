const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Cart = mongoose.model('Shoppingcart')


module.exports.placeOrder = ()=> {

module.exports.placeOrder = (req, res, next) => {
    console.log(req.params.userid);
    console.log(req.body);
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: req.params.userid,
        items: req.body,
        totalPrice: 100,
        orderDate: Date.now(),
        shippingDate: null,
        deliveryDate: null,
        status: "Ordered"
    })
    order.save((err, order) => {
        if (!err) {
            console.log('order saved', order);
            Cart.deleteOne({ user: order.user }, (err) => {
                if (!err)
                    console.log('cart deleted');
                else
                    console.log('Error cart deletion');
            })
        } else {
            console.log('error', err);
        }


    })
    res.send({ message: 'Ok' })
}

module.exports.getOrders = (req, res, next) => {
    Order.find({ user: req.params.userid }, (err, order) => {
        if (!err) {
            res.send(order)
        } else {
            res.send({ message: 'Error: no order' })
        }
    })
}
module.exports.getSellersOrders = (req, res, next) => {
    Order.find((err, order) => {
        if (!err) {
            res.send(order)
        } else {
            res.send({ message: 'Error: no order' })
        }
    })
}
module.exports.cancelOrder = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderid, status: "Ordered" }, (err, order) => {
        if (!err) {
            console.log('deleted');
            res.send({ message: 'Order successfully cancelled' })
        } else {
            console.log('not deleted');
            res.send({ message: 'This order is either shipped or delevered' })

        }
    })
}
module.exports.changeStatus = (req, res, next) => {
    Order.findByIdAndUpdate(req.params.orderid, (err, order) => {
        if (!err) {
            console.log(order);
            res.send({ message: 'Order status successfully changed' })
        } else {
            console.log('not changed');
            res.send({ message: 'Error in changin status' })

        }
    })
}
}