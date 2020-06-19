const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const jwtHelper = require('../config/jwtHelper');
// image upload

// router.post('/add-product', productController.addNewProduct);
router.get('/', productController.getAllProducts);
router.post('/add-product/:supplierid', productController.addNewProduct);
router.put('/update/:productid', productController.updateProductDetails);
router.delete('/delete/:productid', productController.deleteProduct);
router.get('/:userid', productController.getProductBySeller);
router.get('/:productid', productController.getProductDetails);
router.put('/update-quantity/:productid', productController.updateQuantity);

//product reviews
router.post('/add-review/:userid/:productId', productController.addNewReview);
router.get('/', productController.getAllReviews);


module.exports = router;