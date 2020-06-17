const express = require('express');
const router = express.Router();

const addressController = require('../controllers/address.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/add/:userid/:addressType', addressController.addAddress);
router.get('/:userid/:addressType', addressController.getAddress);
router.get('/:userid', addressController.getAllAddress);


module.exports = router;