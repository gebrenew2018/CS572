const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const creditCardSchema = new Schema({

    _id: {
        type: String,
        required: [true, 'CardId cannot be empty.'],
    },
    cardNumber: {
        type: String,
        required: [true, 'Card Number cannot be empty'],
        unique:true,
    },
    csv: {
        type: Number,
        required: [true, 'Card security code cannot be empty'],
        maxlength:[4, 'must be four digits maximum']
    },
    expMonth: {
        type: String,
        required: [true, 'Card Expirstion date cannot be empty.'],
    },
    expYear: {
        type: Number,
        required: [true, 'Card expiration year cannot be empty.']
    },
   
});

module.exports = mongoose.model('CreditCard', creditCardSchema);