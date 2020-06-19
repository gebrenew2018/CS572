const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Cart = mongoose.model('Shoppingcart');
const User = mongoose.model('User');
const EmailSender = require('.../../../config/mailSender')

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
module.exports.cancelOrder = async(req, res, next) => {
    const existingOrder = await Order.find({ _id: req.params.orderid, status: "Ordered" });

    if (existingOrder.length == 0) {
        res.send({ message: 'This order is either shipped or delevered' })
    } else {
        Order.deleteOne({ _id: req.params.orderid, status: "Ordered" }, (err, order) => {
            if (!err) {

                User.findById({ _id: existingOrder[0].user }, (err, user) => {
                    var email = {
                        orderid: existingOrder[0]._id,
                        email: user.email,
                        status: "Cancelled"
                    }
                    req.body = email;
                    const emailSender = EmailSender.send(email);
                })
                res.send({ message: 'Order successfully cancelled' })

            } else {
                console.log('not deleted');
                res.send({ message: 'This order is either shipped or delevered' })

            }
        })
    }


}
module.exports.changeStatus = async(req, res, next) => {
    const orderid = req.body.status.split(' ')[0];
    const status = req.body.status.split(' ')[1];
    console.log('orderId:' + orderid)
    console.log('Status:' + status)
    const existingOrder = await Order.findOne({ _id: orderid })
    const user = await User.findById({ _id: existingOrder.user })
    console.log(user);

    existingOrder.status = status
    await existingOrder.save();
    // send email
    var email = {
        orderid: existingOrder._id,
        email: user.email,
        status: status
    }
    req.body = email;
    const emailSender = EmailSender.send(email);
    //end of send email
    res.send({ message: 'Status Updated.' })
}