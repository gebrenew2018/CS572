//npm i bcryptjs body-parser cors express jsonwebtoken lodash mongoose multer nodemon passport passport-local 
const mongoose = require('mongoose');
const Product = required('./product.model.js');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }

    },
    products: [{
        poductId: {
            type: String,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: 'name can\'t be empty',
        },
        price: {
            type: Number,
            required: 'price can\'t be empty',
        },
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

//methods 
cartSchema.methods.addToCart = async function(productId) {
    const product = await Product.findById(productId);
    if (product) {
        let cart = this.cart;
        const
    }
}



module.exports = mongoose.model('Cart', cartSchema);