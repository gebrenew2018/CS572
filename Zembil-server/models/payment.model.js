const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentScehma = new Schema({
    _id: {
        type: String,
        required: 'User Id cannot be empty'
    },
    user: {
        userId: {
            type: String,
            ref: 'User',
            required: true
        }

    },
    order: [{
        orderId: {
            type: String,
            ref: 'Order',
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }]

});


module.exports = mongoose.model('Payment', paymentScehma);