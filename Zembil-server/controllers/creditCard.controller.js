const mongoose = require('mongoose');
const CreditCard = require('../models/creditCard.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');


module.exports.addNewCreditCard = (req, res, next) => {
    const creditCard = new CreditCard({
        _id: new mongoose.Types.ObjectId(),
        cardOwner: req.body.cardOwner,
        billingAddress: req.body.billingAddress,
        amountInCard: req.body.amountInCard,
        cardNumber: req.body.cardNumber,
        csv: req.body.csv,
        expMonth: req.body.expMonth,
        expYear: req.body.expYear

    });

    creditCard.save((err, creditCard) => {
        if (err) {
            res.status(400).json({ message: 'Error occured when saving credit card: ' + err });
        } else if (!creditCard) {
            res.status(404).json({ message: 'Error occured fetching credit card.' });
        } else {
            console.log(creditCard);
            res.status(200).json({ creditCard: creditCard });
        }

    });

}


module.exports.getAllCreditCards = (req, res, next) => {
    CreditCard.find((err, creditCard) => {
        if (err) {
            res.status(400).jason({ message: 'Error in reading credit cards' });
        } else if (!creditCard) {
            res.status(404).json({ message: 'No credit cards found' });
        } else {
            res.status(200).json({ message: creditCard });
        }
    });
}

module.exports.getCreditCardDetails = (req, res, next) => {
    const creditCard = req.params._id;
    const filter = { _id: creditCard };
    CreditCard.find(filter, (err, creditCard) => {
        if (err) {
            res.status(400).json({ message: 'Error in reading credit card.' });
        } else if (!creditCard) {
            res.status(404).json({ message: 'No credit card found' });
        } else {
            res.status(200).json({ message: 'Credit card found: ' + creditCard });
        }
    });

}

module.exports.makePayment = (req, res, next) => {
    const creditCard = req.params._id;
    CreditCard.find(creditCard, (err, creditCard) => {
        if (err) {
            res.status(400).jason({ message: 'Error in reading card' });

        } else if (!creditCard) {
            res.status(404).json({ message: 'No card found' });
        } else {
            var amount = parseInt(req.body.amountInCard);
            // const  newAmount = cart.user.creditCard.amountInCard - cart.totalPrice; 
            var newAmount = amount - 1000;
           
            console.log(amount);
          
            amount = newAmount;
            // update card balamnce in data base. write code to update
            // res.status(200).json({ message: 'you have been charged: '+cart.totalPrice});
            res.status(200).json({ message: 'you have been charged: ' + 1000 });
         


        }
    });

}


