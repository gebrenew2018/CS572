const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    _id: {
        type: String,
        required: 'Product Id cannot be empty'
    },
    productName: {
        type: String,
        required: [true, 'Product name cannot be empty']
    },
    imageUrl: {
        type: String,
        required: [true, 'Product name cannot be empty']
    },
    // frontImage: {
    //     type: String,
    //     required: [true, 'Product image cannot be empty']
    // },
    // backImage: {
    //     type: String,
    //     required: [true, 'Product image cannot be empty']
    // },
    quantity: {
        type: Number,
        required: [true, 'Product Quantity cannot be empty']
    },
    supplierId: {
        type: String,
        ref: 'User',
        required: [true, 'Supplier cannot be empty.'],
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit price cannot be empty.']
    },
    category: {
        type: String,
        required: 'Category cannot be empty.'
    },
    review: {
        type: String,
        ref: 'Review'
    },
    isSold: {
        type: Boolean
    }
});

mongoose.model('Product', productSchema);