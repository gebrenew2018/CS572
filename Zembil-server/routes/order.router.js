const express = require('express');
const router = express.Router();

//const orderController = require('../controllers/order.controller');

router.post('/:userid', orderController.placeOrder);
router.get('/:userid', orderController.getOrders);
router.get('/', orderController.getSellersOrders);
router.delete('/:orderid', orderController.cancelOrder);
router.put('/change-status', orderController.changeStatus);



module.exports = router;