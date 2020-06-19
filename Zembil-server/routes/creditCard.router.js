

const express = require('express');
const router = express.Router();

const creditCardController = require('../controllers/creditCard.controller');
const jwtHelper = require('../config/jwtHelper');
router.post('/add/:userid', creditCardController.addNewCreditCard);
router.get('/allcreditCards', creditCardController.getAllCreditCards);
router.get('/creditCardById', creditCardController.getCreditCardDetails);
router.post('/makepayment', creditCardController.makePayment);

module.exports = router;