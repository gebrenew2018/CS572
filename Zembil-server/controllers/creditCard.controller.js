const mongoose = require('mongoose');
//mongoose.set('useCreateIndex', true);
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

module.exports.getCreditCardDetails = async (req, res, next) => {
    const creditID = req.body._id;
    const credit = await CreditCard.findById(creditID);
    console.log('find by id: ' + credit);
    if (!credit) {
        res.status(404).json({ message: 'No credit card found' });
    } else {
        const value = credit.cardNumber;
        function cardNumber_format(value) {
            var val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
            var matches = val.match(/\d{4,16}/g);
            var match = matches && matches[0] || ''
            var parts = []
            for (i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4))
            }
            if (parts.length) {

                return parts.join(' ')

            } else {
                console.log(value);
                return value;
            }
        }
        console.log(cardNumber_format(value));
        res.status(200).json({
            Card_Info: ['card owner: ' + credit.cardOwner, +'\n' +
                'Billing Address: ' + credit.billingAddress, +'\n' +
                'expire year: ' + credit.expYear, +'\n' +
                'expire month: ' + credit.expMonth, +'\n' +
                'last four digit: ' + cardNumber_format(value).substring(15, 19)]
        }); //credit.cardNumber
    }
}

module.exports.makePayment = async (req, res, next) => {
    const creditID = req.body._id;
    const credit = await CreditCard.findById(creditID);
    var availableBalance = credit.amountInCard+3000;
    const totalprice = 50; //cart.totalPrice
    if (!credit) {
        res.status(404).json({ message: 'No card found' });
    } else if (totalprice > availableBalance) {
        res.status(400).json({ message: 'Available balance is less than total price' });

    } else {

        console.log('available balance:' + availableBalance);
        // const  newBalance = cart.user.creditCard.amountInCard - cart.totalPrice; 
        var newBalance = availableBalance - totalprice; //cart.totalPrice
        console.log('new balance: ' + newBalance)
         // update card balance in data base
    const result = CreditCard.updateOne({ _id: creditID }, { $inc: { amountInCard: - totalprice } }, function (err, res) {
        if (!err) {
            console.log(res);
          //  res.status(200).json({ message: 'New balance successfully updated in database' })

        }
    })

        // res.status(200).json({ message: 'you have been charged: '+cart.totalPrice});
        res.status(200).json({ message: 'you have been charged: ' + totalprice + ', remaining amount: ' + availableBalance });
    }


}




