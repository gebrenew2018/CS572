const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash'); // to pass some data of the user model

module.exports.register = (req, res, next) => {

        var user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            telephone: req.body.telephone,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: 1
        });

        user.save((err, doc) => {
            if (!err) {
                res.status(200).json({ user: doc });
            } else {
                if (err.code === 11000) {
                    res.status(422).send(['Duplicate Email address found.'])
                } else {
                    return next(err);
                }

            }
        });
    }
    // get all user details 
module.exports.getAll = (req, res, next) => {
    User.find((err, user) => {
        if (!err) {
            res.status(201).json({ user: user });
        } else if (!user) {
            res.status(404).json({ message: 'users not found' });
        } else {
            res.status(500).json({ message: 'Error in fetching users.' });
        }
    })
}

// get user details by user _id
module.exports.getUserDetails = (req, res, next) => {
    User.findById(req.params.userid, (err, user) => {
        if (!user) {
            res.status(500).json({ message: 'user not found' });
        } else {
            res.status(200).json({ status: true, user: _.pick(user, ['_id', 'firstName', 'lastName', 'telephone', 'role', 'email']) });
        }
    })
}

// get users which are new and registered as sellers
module.exports.getAllUsersByRoleAndStatus = (req, res, next) => {
        User.find({ role: req.params.role, status: req.params.status }, (err, user) => {
            if (!user) {
                res.status(500).json({ message: 'No users were found' });
            } else {
                res.status(200).json({ status: true, user: user });
            }
        })
    }
    // change the users status
module.exports.changeUserStatus = (req, res, next) => {

        User.findByIdAndUpdate(req.params.userid, { $set: { status: req.params.status } }, { new: true }, (err, user) => {
            if (!err) {
                res.status(200).json({ user: user });
            } else if (!user) {
                res.status(404).json({ message: 'User not found.' })
            } else
                res.status(500).json({ message: 'Unable to update the user status.' })
        })
    }
    // update user details by user _id
module.exports.updateUserDetails = (req, res, next) => {
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    User.findById(req.params.userid, (err, user) => {
        if (!err) {
            user.firstName = req.body.firstName,
                user.lastName = req.body.lastName,
                user.telephone = req.body.telephone,
                user.email = req.body.email,
                user.password = req.body.password,
                user.role = req.body.role
            user.save((err, doc) => {
                if (!err) {
                    res.status(200).json({ user: doc });
                } else {
                    if (err.code === 11000) {
                        res.status(422).send(['Duplicate Email address found.'])
                    } else {
                        return next(err);
                    }

                }
            });
        }
    })

}

module.exports.authenticate = (req, res, next) => {
    // call the passport authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);
        else if (user) res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' })
            else return res.status(200).json({ status: true, user: _.pick(user, ['firstName', 'lastName', 'email']) }); // send the necessary information not the whole user data
        })
}