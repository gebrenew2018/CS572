const mongoose = require('mongoose');
const Address = mongoose.model('Address');

module.exports.addAddress = (req, res, next) => {
        var address = new Address({
            _id: new mongoose.Types.ObjectId(),
            addressType: req.params.addressType,
            user: req.params.userid,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            zipcode: req.body.zipcode
        });

        address.save((err, doc) => {
            if (!err) {
                res.status(200).json({ address: doc });
            } else {
                res.send({ message: 'address not saved' })
            }
        });
    }
    // get address
module.exports.getAddress = (req, res, next) => {
    console.log('inside adderss')
    Address.find({ user: req.params.userid, addressType: req.params.addressType }, (err, address) => {
        if (!address) {
            res.send({ message: 'Address not found' });
        } else {
            res.send({ address: address });
        }
    })
}

module.exports.getAllAddress = (req, res, next) => {
    Address.find({ user: req.params.userid }, (err, address) => {
        if (!address) {
            res.send({ message: 'Address not found' });
        } else {
            res.status(200).json({ status: true, address: address });
        }
    })
}