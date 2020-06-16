const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const jwtHelper = require('../config/jwtHelper');
// image upload

// router.post('/add-product', productController.addNewProduct);
router.get('/', productController.getAllProducts);
router.post('/add-product', productController.addNewProduct);
router.put('/update/:productid', productController.updateProductDetails);
router.delete('/delete/:productid', productController.deleteProduct);
router.get('/:productid', productController.getProductDetails);
router.put('/update-quantity/:productid', productController.updateQuantity);


module.exports = router;