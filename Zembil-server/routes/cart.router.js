const express = require('express');
const router = express.Router();
const cartConntroller = require('../controllers/cart.controller');

router.get('/:userid', cartConntroller.getCart);
router.post('/add-to-cart/:userid', cartConntroller.addToCart);
router.delete('/delete-from-cart/:userid', cartConntroller.deleteFromCart);

module.exports = router;