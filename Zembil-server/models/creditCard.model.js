const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var creditCardSchema = new Schema({

    _id: {
        type: String,
        required: [true, 'CardId cannot be empty.'],
    },
    cardOwner:{ userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'CardOwner cannot be empty.'],
    }
},
    billingAddress: { addressId:{
        type: String,
        required: [true, 'Billing address cannot be empty']
    }
},
    cardNumber: {
        type: Number,
        required: [true, 'Card Number cannot be empty']
    },
    csv: {
        type: Number,
        required: [true, 'Card security code cannot be empty']
    },
    expMonth: {
        type: Date,
        required: [true, 'Card Expirstion date cannot be empty.'],
    },
    expYear: {
        type: Number,
        required: [true, 'Card expiration year cannot be empty.']
    },
    amountInCard: {
        type: Number,
        required: [true, 'Available amount should be greater than checkout price.']
    }
});

mongoose.model('creditCard', creditCardSchema);