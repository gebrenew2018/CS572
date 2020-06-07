const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'Product name cannot be empty']
    },
    imageUrl: {
        type: String,
        required: [true, 'Product name cannot be empty']
    },
    quantity: {
        type: String,
        required: [true, 'Product Quantity cannot be empty']
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Supplier cannot be empty.'],
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit price cannot be empty.']
    }
});

mongoose.model('Product', productSchema);