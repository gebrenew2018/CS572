const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        userId: {
            type: String,
            ref: 'User',
            required: true
        }
    },
    cart: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Order', schema);