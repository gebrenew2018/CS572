const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    _id: {
        type: String
    },
    user: {
        type: String,
        ref: 'User'
    },
    addressType: {
        type: String
    },
    country: {
        type: String
    },
    State: {
        type: String,
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    }

});
mongoose.model('Address', addressSchema);