const express = require('express');
const csrf = require('csurf')
const router = express.Router();
const cartConntroller = require('../controllers/cart.controller');
const csrfProtection = csrf();
// router.use(csrfProtection);
router.get('/', cartConntroller.getCart);
router.post('/add-to-cart/:id', cartConntroller.addToCart);
router.delete('/delete-from-cart', cartConntroller.deleteFromCart);
router.get('/checkout', cartConntroller.checkout);
router.post('/checkout', cartConntroller.postCheckout);
module.exports = router;