const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
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

router.post('/add-product', jwtHelper.verifyJwtToken, upload.single('imageUrl'), productController.addNewProduct);

module.exports = router;