const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

router.post('/:userid', orderController.placeOrder);
// router.get('/all', orderController.getAll);
// router.delete('/delete/:orderid', orderController.deleteProduct);



module.exports = router;