const mongoose = require('mongoose');
const CreditCard = require('../models/creditCard.model');
// const CreditCard = mongoose.model('CreditCard');


module.exports.addNewCreditCard = (req, res, next) => {
    console.log(req.file);
    const creditCard = new Product({
        cardNumber: req.body.cardNumber,
        ccv: req.body.ccv,
        expMonth: req.body.expMonth,
        expYear: req.body.expYear,
    });

    console.log(creditCard);
    res.status(200).json({ creditCard: creditCard });
}