const mongoose = require('mongoose');
var Schema=mongoose.Schema;

var Schema = new Schema({
    _id: {
        type: String,
        required: 'Order Id cannot be empty'
    },
    user: {
        type: string,
        ref:'User'
    },
    product: {
        type: String,
        ref:"Product",
        required: 'product cannot be empty'
    },
    shippingAddress: {
        type: String,
        ref:"Address",
        required: 'Shipping Addrress cannot be empty',
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    cancelDate: {
        type: Date,
        default: Date.now
    },
    shippingDate: {
        type: Date ,
        default: Date.now
    },
    deliveryDate:{
        type: Date
    }

});
mongoose.model('Order', orderSchema);