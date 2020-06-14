//npm i bcryptjs body-parser cors express jsonwebtoken lodash mongoose multer nodemon passport passport-local 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: String,
            ref: 'Product',
            required: true
        },
        // price: {
        //     type: Number,
        //     required: 'price can\'t be empty',
        // },
        quantity: {
            type: Number,
            required: 'quantity can\'t be empty',
        }

    }],
    totalPrice: {
        type: Number,
        required: true
    }

});


module.exports = mongoose.model('Cart', cartSchema);