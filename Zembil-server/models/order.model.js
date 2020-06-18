const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: {
        type: String,
        required: 'Order Id cannot be empty'
    },
    user: {
        type: String
    },
    items: [{
        _id: {
            type: String,
        },
        productName: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        unitPrice: {
            type: Number,
        },
        subtotal: {
            type: Number
        }
    }],
    totalPrice: {
        type: Number
    },
    // shippingAddress: {
    //     type: String,
    //     ref:"Address",
    //     required: 'Shipping Addrress cannot be empty',
    // },
    orderDate: {
        type: Date,
    },
    shippingDate: {
        type: Date
    },
    deliveryDate: {
        type: Date
    },
    status: {
        type: String
    }

});


mongoose.model('Order', orderSchema);