const express = require('express');
const router = express.Router();
const cartConntroller = require('../controllers/cart.controller');
const passport = require('passport');

router.get('/', cartConntroller.getCart);
router.post('/add-to-cart/:pId', cartConntroller.addToCart);
router.delete('/removeProduct-from-cart/:pId', cartConntroller.deleteProductFromCart);
router.delete('/removeItem-from-cart/:pId', cartConntroller.deleteItemFromCart);

module.exports = router;