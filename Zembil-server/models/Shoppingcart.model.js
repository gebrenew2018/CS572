const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var cartSchema = new Schema({
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
        }

    ],
    totalPrice: {
        type: Number
    }
});

mongoose.model('Shoppingcart', cartSchema)