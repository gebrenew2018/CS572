const mongoose = require('mongoose');
const Product = require('../models/product.model');

exports.addToCart = (req, res, next) => {
    console.log('addto cart ');

}
exports.getCart = (req, res, next) => {
    console.log('get cart ');
}
exports.deleteFromCart = (req, res, next) => {
    console.log('delete cart ');
}