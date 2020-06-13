
const path = require('path');

const express = require('express');

const shopController = require('../controllers/creditCard.controller');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:prodId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;


/////////////////////////////////////////////////////////////////////



const express = require('express');
const router = express.Router();

const creditCardController = require('../controllers/creditCard.controller');
const jwtHelper = require('../config/jwtHelper');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const filetype = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, true);
        }
    }
    // const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: filetype })


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filetype
})

router.post('/add-creditCard', jwtHelper.verifyJwtToken, upload.single('imageUrl'), creditCardController.addNewCreditCard);

module.exports = router;